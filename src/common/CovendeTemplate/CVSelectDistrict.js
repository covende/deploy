import React, { useEffect, useState } from 'react';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import {
  distritoByID,
  distritosByNameFull
} from '@CVApi/core/webpublic/createstore/Planservice';
import CVSelectMultiple from './CVSelectMultiple';

/**
 *
 * @param {Object} param0
 * @param {String} param0.district
 * @param {Function} param0.setDistrict
 * @returns
 */
function CVSelectDistrict({ district, setDistrict = () => {} }) {
  const [localDistrict, setLocalDistrict] = useState({ _id: '', name: '' });
  const [districts, setDistricts] = useState([]);
  const [init, setInit] = useState(false);

  const findDistrict = async (value) => {
    let name = String(value).trim();
    if (init) return setInit(false);

    if (name != '') {
      setLocalDistrict({ _id: '', name: '' });
      setDistricts([]);
      setDistrict([]);
    }

    if (name.length < 3 || name == localDistrict.name) return;

    let { ubigeoDistritosByName: result } = await AxiosGQL(
      distritosByNameFull(name)
    );

    console.log('Consultado API ');

    if (result?.data) {
      let newDistricts = result.data.map((dist) => ({
        ...dist,
        _id: dist?.district?._id,
        name:
          (dist?.department?.name || '') +
          ' / ' +
          (dist?.province?.name || '') +
          ' / ' +
          (dist?.district?.name || '')
      }));

      setDistricts(newDistricts);
      if (newDistricts.length == 0) setDistrict([]);
    }
  };

  const initData = async (value) => {
    if (value == localDistrict?._id) return;

    let foundDistrict = districts.find((dis) => dis._id == value);
    if (foundDistrict) setLocalDistrict({ ...foundDistrict });
    else {
      let { ubigeoDistritoByID: resp } = await AxiosGQL(distritoByID(value));

      if (resp?.district?._id) {
        foundDistrict = {
          ...resp,
          _id: resp?.district?._id,
          name:
            (resp?.department?.name || '') +
            ' / ' +
            (resp?.province?.name || '') +
            ' / ' +
            (resp?.district?.name || '')
        };
        setLocalDistrict({ ...foundDistrict });
        setDistricts([{ ...foundDistrict }]);
      }
    }
  };

  useEffect(() => {
    initData(district);
  }, [district]);

  return (
    <CVSelectMultiple
      options={districts}
      placeholder='Ingrese distrito'
      value={!!localDistrict._id ? localDistrict : null}
      itemText='name'
      itemValue='_id'
      onInputChange={(value) => {
        findDistrict(value);
      }}
      onChange={(values) => {
        setInit(true);
        setLocalDistrict({ ...values });
        setDistricts([{ ...values }]);
        setDistrict([values?.department, values?.province, values?.district]);
      }}
    />
  );
}

export default CVSelectDistrict;
