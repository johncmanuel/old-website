import { useTable, usePagination } from "react-table";
import styles from 'public/assets/css/bookshelf.module.css'


/**
 * Create table for bookshelf page.
 * See documentation for more information: https://react-table.tanstack.com/docs/
 * 
 * @param columns   Array of objects with a name string and an accessor string. Used to label the table columns.
 * @param data      Object extracted from bookshelf.js.
 * @return          JSX element, including pagination div.
 */
function Table({ columns, data }) {

    // Get necessary components from react-table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        usePagination
    );

    return (
        <>
            <table className="table table-striped table-bordered table-responsive-md add-shadow" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th scope="col" {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {/* Pagination layout beneath table */}
            <div className={styles["pagination-mobile"] + ' ' + "pagination justify-content-center"}>
                <div className="input-group mb-3 text-center" id={styles["input-group-mobile"]}>
                    <div className="input-group-prepend add-shadow">
                        <span className="input-group-text" id="input-text-one">
                            Go to Page:
                        </span>
                    </div>
                    <span>
                        <input
                            className="form-control add-shadow"
                            type="number"
                            id={styles["page-form"]}
                            defaultValue={pageIndex + 1}
                            max={pageOptions.length}
                            onChange={event => {
                                const page = event.target.value ? Number(event.target.value) - 1 : 0;
                                gotoPage(page);
                            }}
                        />
                    </span>
                </div>
                <div className={styles["page-num"]}>
                    <span>
                        Page {pageIndex + 1} of {pageOptions.length}
                    </span>
                </div>
                <div className='text-center'>
                    <div className="btn-group btn-group-lg" role="group" aria-label="Button Group">
                        <div className={styles["page-zero"]}>
                            <button type="button" 
                                className="btn btn-outline-dark" 
                                onClick={() => gotoPage(0)} 
                                disabled={!canPreviousPage}
                            >
                                {'<<'}
                            </button>{' '}
                        </div>
                        <div className={styles["previous"]}>
                            <button type="button" 
                                className="btn btn-outline-dark" 
                                onClick={() => previousPage()} 
                                disabled={!canPreviousPage}
                            >
                                {'<'}
                            </button>{' '}
                        </div>
                        <div className={styles["next-page"]}>
                            <button type="button" 
                                className="btn btn-outline-dark" 
                                onClick={() => nextPage()} 
                                disabled={!canNextPage}
                            >
                                {'>'}
                            </button>{' '}
                        </div>
                        <div className={styles["page-max-count"]}>
                            <button type="button" 
                                className="btn btn-outline-dark" 
                                onClick={() => gotoPage(pageCount - 1)} 
                                disabled={!canNextPage}
                            >
                                {'>>'}
                            </button>{' '}
                        </div>
                    </div>
                </div>
                <div className="input-group" id={styles["rows-dropdown"]}>
                    <select
                        className="custom-select add-shadow"
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30].map(pageSize => (
                            <option className="dropdown-item" key={pageSize} value={pageSize}>
                                {pageSize} rows
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}

/**
 * Render a table of books with react-table.
 * 
 * @param   obj props passed by bookshelf.js component
 * @return  JSX element
 */
export default function BookshelfTable({ obj }) {
    const columns = [
        {
            Header: "Row",
            accessor: (row, i) => i + 1
        },
        {
            Header: "Title",
            accessor: "title"
        },
        {
            Header: "Author",
            accessor: "author"
        },
        {
            Header: "Date Read*",
            accessor: "date_read"
        },
    ];

    return (
        <Table columns={columns} data={obj} />
    )
}