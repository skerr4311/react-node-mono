import { FC } from 'react';

import { Table } from '@mono-repo/ui-shared';
import { usePatients } from '@mono-repo/api';

export const HomePage: FC = () => {
  const { data: patients } = usePatients();

  console.log(patients);

  return <Table patients={patients} />;
};
