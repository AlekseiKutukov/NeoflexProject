import React, { useState, useMemo } from "react";
import styles from "./Table.module.css";
import ArrowUpIcon from "./../../assets/icons/Expand_up.svg";

interface TableProps {
  data: any[];
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key !== null) {
      const key = sortConfig.key as keyof (typeof sortableItems)[0];

      sortableItems.sort((a, b) => {
        if (a[key] < b[key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const SortArrow = ({ columnKey }: { columnKey: string }) => {
    const isActive = sortConfig.key === columnKey;
    const isDescending = isActive && sortConfig.direction === "desc";

    const iconClass = `${styles.icon} ${isDescending ? styles.rotateIcon : ""} ${!isActive ? styles.iconInactive : ""}`;

    return <img src={ArrowUpIcon} className={iconClass} alt="Sort Arrow" />;
  };

  const columns = [
    { label: "NUMBER", key: "number" },
    { label: "DATE", key: "date" },
    { label: "TOTAL PAYMENT", key: "totalPayment" },
    { label: "INTEREST PAYMENT", key: "interestPayment" },
    { label: "DEBT PAYMENT", key: "debtPayment" },
    { label: "REMAINING DEBT", key: "remainingDebt" },
  ];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} onClick={() => requestSort(column.key)}>
                <div className={styles.headerCell}>
                  {column.label}
                  <SortArrow columnKey={column.key} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <tr key={index}>
                <td>{item.number}</td>
                <td>{item.date}</td>
                <td>{item.totalPayment.toFixed(2)}</td>
                <td>{item.interestPayment.toFixed(2)}</td>
                <td>{item.debtPayment.toFixed(2)}</td>
                <td>{item.remainingDebt.toFixed(2)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className={styles.noData}>
                No payment schedule available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
