import { Button } from '@mui/material';
import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ButtonsSubHeader = () => {
  return (
    <Container>
      <Button variant="outlined" type="button" sx={{ width: '200px' }}>
        Previous month
      </Button>
      <Button
        variant="contained"
        type="button"
        color="secondary"
        sx={{ width: '200px' }}
      >
        Add new category
      </Button>
      <Button variant="outlined" type="button" sx={{ width: '200px' }}>
        Next month
      </Button>
    </Container>
  );
};

export default ButtonsSubHeader;
