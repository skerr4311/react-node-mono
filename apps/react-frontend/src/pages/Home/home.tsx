import { FC } from 'react';

import { Table } from '@mono-repo/ui-shared';
import { usePatients } from '@mono-repo/api';

export const HomePage: FC = () => {
  const { data: patients } = usePatients();

  return <Table patients={patients} onRowClick={(patient) => console.log(patient)} />;
};
