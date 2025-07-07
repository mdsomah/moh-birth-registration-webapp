import React, { useState, useMemo, useCallback } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { LuRefreshCw } from "react-icons/lu";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaFileExcel } from "react-icons/fa";
import { FaFileWord } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { TiExport } from "react-icons/ti";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Document,
  Header,
  Footer,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import {
  ExcelColumnsHeader,
  WordColumnsHeader,
  PDFColumnsHeader,
} from "../ColumnsHeader/ColumnsHeader";

//? React Responsive Media Queries
import { useMediaQuery } from "react-responsive";

export let Row_Data;
export let Close_Menu;

const ReportsTable = (props) => {
  //? Desktop or Laptop Responsive Media Queries
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  //? Tablet or Mobile Responsive Media Queries
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  //? Destructure props
  const { reportResults } = props;

  //? Data Definition
  const data = useMemo(
    () =>
      reportResults?.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1;
        if (a.createdAt < b.createdAt) return 1;
        return 0;
      }) ?? [],
    [reportResults]
  );

  //? Columns Definition
  const columns = useMemo(
    () => [
      {
        accessorFn: (row) => `${row?.applicantFirstName}`,
        id: "applicantFirstName",
        header: "Full Name",
        size: 180,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Avatar
              alt={`${row?.original?.applicantFirstName} Photo`}
              src={`/uploads/${row?.original?.applicantPhoto}`}
              sx={{
                width: 50,
                height: 50,
              }}
              slotProps={{
                img: { loading: "lazy" },
              }}
            />
            <span>
              {row?.original?.applicantFirstName}{" "}
              {row?.original?.applicantMiddleName}{" "}
              {row?.original?.applicantLastName}
            </span>
          </Box>
        ),
      },
      {
        accessorKey: "applicantDateOfBirth",
        header: "DoB",
        size: 140,
      },
      {
        accessorKey: "applicantContactNumber",
        header: "Phone",
        size: 140,
      },
      {
        accessorKey: "applicantMother.motherName",
        header: "Mother Name",
        size: 140,
      },
      {
        accessorKey: "applicantFather.fatherName",
        header: "Father Name",
        size: 140,
      },
    ],
    []
  );

  //? All Applicants Export Menu State
  const [openExportMenu, setOpenExportMenu] = useState(null);
  const openMenu = Boolean(openExportMenu);

  //? All Applicants Export Menu Functions
  const handleOpenExportMenu = useCallback((e) => {
    setOpenExportMenu(e.currentTarget);
  }, []);

  const handleCloseExportMenu = useCallback(() => {
    setOpenExportMenu(null);
  }, []);

  //? Selected Applicants Export Menu State
  const [openSelectedExportMenu, setOpenSelectedExportMenu] = useState(null);
  const openSelectedMenu = Boolean(openSelectedExportMenu);

  //? Selected Applicants Export Menu Functions
  const handleOpenSelectedExportMenu = useCallback((e) => {
    setOpenSelectedExportMenu(e.currentTarget);
  }, []);

  const handleCloseSelectedExportMenu = useCallback(() => {
    setOpenSelectedExportMenu(null);
  }, []);

  //? handleExcelExportData
  const handleExcelExportData = useCallback(
    (rows) => {
      const columnsHeader = ExcelColumnsHeader.map((column) => column.header);
      const rowsData = rows.map((row) => ({
        formNumber: row?.original?.formNumber,
        applicantFirstName: row?.original?.applicantFirstName,
        applicantMiddleName: row?.original?.applicantMiddleName,
        applicantLastName: row?.original?.applicantLastName,
      }));

      const worksheet = XLSX.utils.json_to_sheet(rowsData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants Export");
      XLSX.utils.sheet_add_aoa(worksheet, [columnsHeader], { origin: "A1" });
      const max_width = rowsData.reduce(
        (w, r) => Math.max(w, r.formNumber?.length),
        10
      );
      worksheet["!cols"] = [{ wch: max_width }];
      const excelBlob = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBlob], { type: "application/octet-stream" });
      saveAs(blob, "Applicants_Export.xlsx");
      handleCloseExportMenu();
    },
    [handleCloseExportMenu]
  );

  //? handleSelectedExcelExportData
  const handleSelectedExcelExportData = useCallback(
    (rows) => {
      const columnsHeader = ExcelColumnsHeader.map((column) => column.header);
      const rowsData = rows.map((row) => ({
        formNumber: row?.original?.formNumber,
        applicantFirstName: row?.original?.applicantFirstName,
        applicantMiddleName: row?.original?.applicantMiddleName,
        applicantLastName: row?.original?.applicantLastName,
      }));

      const worksheet = XLSX.utils.json_to_sheet(rowsData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants Export");
      XLSX.utils.sheet_add_aoa(worksheet, [columnsHeader], { origin: "A1" });
      const max_width = rowsData.reduce(
        (w, r) => Math.max(w, r.formNumber?.length),
        10
      );
      worksheet["!cols"] = [{ wch: max_width }];
      const excelBlob = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBlob], { type: "application/octet-stream" });
      saveAs(blob, "Applicants_Export.xlsx");
      handleCloseSelectedExportMenu();
    },
    [handleCloseSelectedExportMenu]
  );

  //? handlePDFExportData
  const handlePDFExportData = useCallback(
    (rows) => {
      const columnsHeader = PDFColumnsHeader;
      const pdfDoc = new jsPDF();
      pdfDoc.text("Applicants Export", 15, 10);
      const tableData = rows.map((row) =>
        Object.values({
          formNumber: row?.original?.formNumber,
          applicantFirstName: row?.original?.applicantFirstName,
          applicantMiddleName: row?.original?.applicantMiddleName,
          applicantLastName: row?.original?.applicantLastName,
        })
      );

      autoTable(pdfDoc, {
        theme: "striped",
        head: [columnsHeader],
        body: tableData,
      });

      pdfDoc.save("Applicants_Export.pdf");
      handleCloseExportMenu();
    },
    [handleCloseExportMenu]
  );

  //? handleSelectedPDFExportData
  const handleSelectedPDFExportData = useCallback(
    (rows) => {
      const columnsHeader = PDFColumnsHeader;
      const pdfDoc = new jsPDF();
      pdfDoc.text("Applicants Export", 15, 10);
      const tableData = rows.map((row) =>
        Object.values({
          formNumber: row?.original?.formNumber,
          applicantFirstName: row?.original?.applicantFirstName,
          applicantMiddleName: row?.original?.applicantMiddleName,
          applicantLastName: row?.original?.applicantLastName,
        })
      );

      autoTable(pdfDoc, {
        theme: "striped",
        head: [columnsHeader],
        body: tableData,
      });

      pdfDoc.save("Applicants_Export.pdf");
      handleCloseSelectedExportMenu();
    },
    [handleCloseSelectedExportMenu]
  );

  //? handleWordExportData
  const handleWordExportData = useCallback(
    (rows) => {
      //? tableHeaders
      const tableHeaders = WordColumnsHeader.map(
        (col) =>
          new TableCell({
            children: [
              new Paragraph({
                text: col.header,
                heading: HeadingLevel.HEADING_3,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
          })
      );

      //? tableData
      const tableData = rows.map(
        (row) =>
          new TableRow({
            height: {
              value: 300,
              rule: "auto",
            },
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.formNumber,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.applicantFirstName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.applicantMiddleName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.applicantLastName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
            ],
          })
      );

      //? Table Definition
      const table = new Table({
        columnWidths: [4505, 4505],
        rows: [
          new TableRow({
            children: tableHeaders,
            tableHeader: true,
            cantSplit: true,
            height: {
              value: 300,
              rule: "auto",
            },
          }),
          ...tableData,
        ],
        width: {
          size: 4545,
          type: WidthType.PERCENTAGE,
        },
        indent: {
          size: 600,
          type: WidthType.PERCENTAGE,
        },
      });

      const wordDoc = new Document({
        creator: "National Security Agency (NSA)",
        description: "Applicants export listing",
        title: "Applicants Export Listing",
        sections: [
          {
            headers: {
              default: new Header({
                children: [new Paragraph({ text: "Page Header" })],
              }),
            },
            footers: {
              default: new Footer({
                children: [new Paragraph({ text: "Page Footer" })],
              }),
            },
            children: [
              new Paragraph({
                text: "Applicants Export",
                heading: HeadingLevel.TITLE,
              }),
              table,
            ],
          },
        ],
      });

      Packer.toBlob(wordDoc).then((blob) => {
        saveAs(blob, "Applicants_Export.docx");
      });
      handleCloseExportMenu();
    },
    [handleCloseExportMenu]
  );

  //? handleSelectedWordExportData
  const handleSelectedWordExportData = useCallback(
    (rows) => {
      //? tableHeaders
      const tableHeaders = WordColumnsHeader.map(
        (col) =>
          new TableCell({
            children: [
              new Paragraph({
                text: col.header,
                heading: HeadingLevel.HEADING_3,
              }),
            ],
            verticalAlign: VerticalAlign.CENTER,
            width: {
              size: 3505,
              type: WidthType.DXA,
            },
          })
      );

      //? tableData
      const tableData = rows.map(
        (row) =>
          new TableRow({
            height: {
              value: 300,
              rule: "auto",
            },
            children: [
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.ninNumber,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.lastName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.firstName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.middleName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.displayName,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.height,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
              new TableCell({
                children: [
                  new Paragraph({
                    text: row?.original?.applicantStatus,
                  }),
                ],
                verticalAlign: VerticalAlign.CENTER,
                width: {
                  size: 3505,
                  type: WidthType.DXA,
                },
              }),
            ],
          })
      );

      //? Table Definition
      const table = new Table({
        columnWidths: [4505, 4505],
        rows: [
          new TableRow({
            children: tableHeaders,
            tableHeader: true,
            cantSplit: true,
            height: {
              value: 300,
              rule: "auto",
            },
          }),
          ...tableData,
        ],
        width: {
          size: 4545,
          type: WidthType.PERCENTAGE,
        },
        indent: {
          size: 600,
          type: WidthType.PERCENTAGE,
        },
      });

      const wordDoc = new Document({
        creator: "National Security Agency (NSA)",
        description: "Applicants export listing",
        title: "Applicants Export Listing",
        sections: [
          {
            headers: {
              default: new Header({
                children: [new Paragraph({ text: "Page Header" })],
              }),
            },
            footers: {
              default: new Footer({
                children: [new Paragraph({ text: "Page Footer" })],
              }),
            },
            children: [
              new Paragraph({
                text: "Applicants Export",
                heading: HeadingLevel.TITLE,
              }),
              table,
            ],
          },
        ],
      });

      Packer.toBlob(wordDoc).then((blob) => {
        saveAs(blob, "Applicants_Export.docx");
      });
      handleCloseSelectedExportMenu();
    },
    [handleCloseSelectedExportMenu]
  );

  //? Table Definition
  const table = useMaterialReactTable({
    columns: columns,
    data: data,
    enableColumnOrdering: true,
    enableRowSelection: true,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    muiToolbarAlertBannerProps: () => {
      // return reportsError
      //   ? {
      //       color: "error",
      //       children: "Error Loading Data!",
      //     }
      //   : undefined;
    },
    renderTopToolbarCustomActions: ({ table }) => {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
            }}
          >
            {/* Start Desktop & LaptopView */}
            {isDesktopOrLaptop && (
              <Button
                id="basic-button"
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                variant="text"
                endIcon={<RiArrowDropDownLine size={26} />}
                onClick={handleOpenExportMenu}
              >
                Export All Rows
              </Button>
            )}
            {/*End Desktop & Laptop View */}

            {/* Start Table & Mobile View */}
            {isTabletOrMobile && (
              <Tooltip arrow placement="bottom" title="Export All Rows">
                <IconButton
                  id="basic-button"
                  disabled={table.getPrePaginationRowModel().rows.length === 0}
                  aria-controls={openMenu ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  sx={{ bgcolor: "#000", color: "#d4bf79" }}
                  onClick={handleOpenExportMenu}
                >
                  <TiExport />
                </IconButton>
              </Tooltip>
            )}
            {/*End Table & Mobile View */}

            {/* Start Desktop & LaptopView */}
            {isDesktopOrLaptop && (
              <Button
                id="basic-button-selected"
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                aria-controls={
                  openSelectedMenu ? "basic-menu-selected" : undefined
                }
                aria-haspopup="true"
                aria-expanded={openSelectedMenu ? "true" : undefined}
                variant="text"
                endIcon={<RiArrowDropDownLine size={26} />}
                onClick={handleOpenSelectedExportMenu}
              >
                Export Selected Row(s)
              </Button>
            )}
            {/*End Desktop & Laptop View */}

            {/* Start Table & Mobile View */}
            {isTabletOrMobile && (
              <Tooltip arrow placement="bottom" title="Export Selected Row(s)">
                <IconButton
                  id="basic-button-selected"
                  disabled={
                    !table.getIsSomeRowsSelected() &&
                    !table.getIsAllRowsSelected()
                  }
                  aria-controls={
                    openSelectedMenu ? "basic-menu-selected" : undefined
                  }
                  aria-haspopup="true"
                  aria-expanded={openSelectedMenu ? "true" : undefined}
                  sx={{ bgcolor: "#000", color: "#d4bf79" }}
                  onClick={handleOpenSelectedExportMenu}
                >
                  <TiExport />
                </IconButton>
              </Tooltip>
            )}
            {/*End Table & Mobile View */}

            {/* Start Export All Rows */}
            <Menu
              id="basic-menu"
              anchorEl={openExportMenu}
              open={openMenu}
              onClose={handleCloseExportMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() =>
                  handleExcelExportData(table.getPrePaginationRowModel().rows)
                }
              >
                <FaFileExcel color="#33c481" size={20} />
                <span style={{ marginLeft: 10 }}>Export as Excel</span>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handlePDFExportData(table.getPrePaginationRowModel().rows)
                }
              >
                <FaFilePdf color="#f40f02" size={20} />
                <span style={{ marginLeft: 10 }}>Export as PDF</span>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleWordExportData(table.getPrePaginationRowModel().rows)
                }
              >
                <FaFileWord color="#4472C4" size={20} />
                <span style={{ marginLeft: 10 }}>Export as Word</span>
              </MenuItem>
            </Menu>
            {/* End Export All Rows */}

            {/* Start Export Selected Rows */}
            <Menu
              id="basic-menu-selected"
              anchorEl={openSelectedExportMenu}
              open={openSelectedMenu}
              onClose={handleCloseSelectedExportMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button-selected",
              }}
            >
              <MenuItem
                onClick={() =>
                  handleSelectedExcelExportData(
                    table.getSelectedRowModel().rows
                  )
                }
              >
                <FaFileExcel color="#33c481" size={20} />
                <span style={{ marginLeft: 10 }}>Export as Excel</span>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleSelectedPDFExportData(table.getSelectedRowModel().rows)
                }
              >
                <FaFilePdf color="#f40f02" size={20} />
                <span style={{ marginLeft: 10 }}>Export as PDF</span>
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleSelectedWordExportData(table.getSelectedRowModel().rows)
                }
              >
                <FaFileWord color="#4472C4" size={20} />
                <span style={{ marginLeft: 10 }}>Export as Word</span>
              </MenuItem>
            </Menu>
            {/* End Export Selected Rows */}
            <Tooltip arrow placement="bottom" title="Refresh Data">
              {/* <IconButton onClick={() => reportsRefetch()}>
                <LuRefreshCw color="#acb5c3" size={20} />
              </IconButton> */}
            </Tooltip>
          </Box>
        </>
      );
    },
    // state: {
    //   isLoading: reportsLoading,
    //   showAlertBanner: reportsError,
    //   showProgressBars: reportsLoading ? reportsLoading : reportsRefetching,
    // },
  });

  return (
    <React.Fragment>
      <MaterialReactTable table={table} />
    </React.Fragment>
  );
};

export default React.memo(ReportsTable);
