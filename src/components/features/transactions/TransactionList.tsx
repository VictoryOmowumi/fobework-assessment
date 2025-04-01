import React from 'react'
import {
  DataGrid, GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarColumnsButton,
  GridToolbarContainer

} from '@mui/x-data-grid'
import { getStatusClasses } from '@/utils/format';
const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'amount', headerName: 'Amount', flex: 1 },
  { field: 'currency', headerName: 'Currency', flex: 1 },
  {
    field: 'status', headerName: 'Status', flex: 1,
    renderCell: (params) => {
      const status = params.row.status;
      return (
        <div >
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusClasses(status)}`}>
            {status}
          </span>

        </div>
      );
    }
  },
  { field: 'transactionType', headerName: 'Transaction Type', flex: 1 },
  {
    field: 'recipient',
    headerName: 'Recipient',
    flex: 1,
    renderCell: (params) => {
      const recipient = params.row.recipient;
      return (
        <div>
          <p className='capitalize'>{recipient.name} - {recipient.accountNumber}</p>

        </div>
      );
    }
  },
  { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
  { field: 'transactionDate', headerName: 'Transaction Date', flex: 1 },
  { field: 'category', headerName: 'Category', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => (
      <div className="space-x-2">
        {params.row.status === 'Pending' && (
          <span className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
            Cancel
          </span>
        )}
        <button className="px-3 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
          Receipt
        </button>
        {params.row.status === 'Successful' && (
          <button className="px-3 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100">
            Dispute
          </button>
        )}
      </div>
    )
  }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarQuickFilter />
      <div className="flex-1/6"></div>
      <div className="flex gap-4">
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
      </div>
    </GridToolbarContainer>
  );
}


const TransactionList = ({ transactions, loading = false }) => {
  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        loading={loading}
        pageSize={10}
        pageSizeOptions={[5, 10, 20]}

        getRowId={(row) => row.id}
        disableSelectionOnClick
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
      />
    </div>
  )
}

export default TransactionList