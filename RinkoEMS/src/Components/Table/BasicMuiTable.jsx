import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

//nested data is ok, see accessorKeys in ColumnDef below

const BasicMuiTable = ({tableName,columns,data}) => {
  //should be memoized or stable
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return (
    <div>
      <h3>{tableName}</h3>
      <MaterialReactTable table={table} />
    </div>
  );
  
};

export default BasicMuiTable;
