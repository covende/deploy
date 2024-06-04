import useGetPermisions from '@/common/hooks/useGetPermisions';
import React from 'react';

function SubastasBo(props) {
  const SubastasPermisions = useGetPermisions('Backoffice', 'Subastas');
  console.log({ SubastasPermisions });
  return <div>SubastasBo</div>;
}

export default SubastasBo;
