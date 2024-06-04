import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { Flex, Box } from '@chakra-ui/react';
import { Chip, IconButton } from '@material-ui/core';
import CVInput from './CVInput';
import { v4 } from 'uuid';
/**
 *
 * @param {Object} param0
 * @param {[String]} param0.value
 * @param {Function} param0.onChange
 * @param {Number} param0.limit
 * @returns
 */
const CVInputChip = ({ value, onChange, limit = 12 }) => {
  const [typing, setTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleTagRemove = (tag) => {
    console.log({ tag });
    const nextTags = value.filter((item) => item !== tag);
    console.log({ nextTags });
    onChange(nextTags);
  };

  const handleInputConfirm = (inputValue) => {
    const nextTags = inputValue ? [...value, inputValue] : value;
    onChange(nextTags);
    setTyping(false);
    setInputValue('');
  };

  const handleButtonClick = () => {
    setTyping(true);
  };

  const renderInput = () => {
    if (value.length >= limit) {
      return <></>;
    }

    if (typing) {
      return (
        <CVInput
          width='100px'
          value={inputValue}
          onChange={setInputValue}
          onEnter={(value) => handleInputConfirm(value)}
          onChange={(value) => handleInputConfirm(value)}
        />
      );
    }

    return (
      <IconButton onClick={handleButtonClick} aria-label='Agregar'>
        <BiPlus />
      </IconButton>
    );
  };

  return (
    <Flex>
      {value.map((item, index) => (
        <Box key={v4()} padding='0.5rem'>
          <Chip
            color='primary'
            label={item}
            onDelete={() => handleTagRemove(item)}
          />
        </Box>
      ))}
      {renderInput()}
    </Flex>
  );
};

export default CVInputChip;
