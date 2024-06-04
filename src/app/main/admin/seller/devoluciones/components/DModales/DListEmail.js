import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVModal } from '@/common/CovendeTemplate';
import CVInput from '@CVTemplate/core/CVInput';
import { Grid } from '@material-ui/core';
import React from 'react';
import { v4 } from 'uuid';
import { Button } from '@chakra-ui/button';
import { Trash } from '@/app/assets/icons';

function DListEmail({ isOpen, onClose, process, emails }) {
  return (
    <CVModal
      header='Lista de correos electrónicos'
      bgHeader='primary'
      isOpen={isOpen}
      onClose={onClose}
      colorHeader='white'>
      <SizeBox />

      <Grid container spacing={1}>
        {emails.map((email) => (
          <React.Fragment key={v4()}>
            <Grid item xs={11}>
              <CVInput widthBox='100%' value={email} disabled={true} />
            </Grid>
            <Grid item xs={1}>
              <Button mt={2} variant='link' onClick={() => process(email)}>
                {Trash}
              </Button>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </CVModal>
  );
}

export default DListEmail;
