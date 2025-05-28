import Select from "@/components/form/Select";
import { useSidebar } from "@/context/SidebarContext";
import { ChevronDownIcon } from "@/icons";
import { useMemo } from "react";

type PaginationProps = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  setPageSize: (page: number) => void;
  setCurrentPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  pageSize,
  currentPage,
  totalPages,
  setPageSize,
  setCurrentPage,
}) => {
  const { isExpanded } = useSidebar();

  const caculatePages = (totalPages: number, currentPage: number) => {
    
    const pages = [];
    const numberOfPages = 3;
  
    const startPage = Math.max(currentPage === totalPages ? currentPage - (numberOfPages -1) : currentPage -(numberOfPages-2), 1);
    const endPage = Math.min(startPage + (numberOfPages -1), totalPages);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }


    return pages;
  }

  const calculation = useMemo(() => caculatePages(totalPages, currentPage), [totalPages, currentPage]);

  const handleSelectChange = (value: string) => {
    setPageSize(parseInt(value))
  };
  

  return (
    <div className={`flex justify-between ${isExpanded ? "": "flex-col items-center space-y-4"}`}>
    <div>
        <div className="flex items-center gap-3">
      <span className="text-gray-500 dark:text-gray-400">Show</span>
      <div className="relative z-20 bg-transparent">
        <Select
        defaultValue={pageSize.toString()}
        options={[
          { value: "10", label: "10" },
          { value: "20", label: "20" },
          { value: "50", label: "50" },
          { value: "100", label: "100" },
        ]}
        onChange={handleSelectChange}
        className="dark:bg-dark-900"
      />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
          <ChevronDownIcon/>
        </span>
      </div>
        <span className="text-gray-500 dark:text-gray-400">entries</span>
    </div> </div>

    <div className="flex items-center">
      <button
        onClick={() => setCurrentPage(1)}
        disabled={currentPage <= 1}
        className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
      >
        First         
      </button>
      <div className="flex items-center gap-2">
        {calculation.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-brand-500 text-white"
                : "text-gray-700 dark:text-gray-400"
            } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage >= totalPages}
        className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        Last
      </button>
    </div>
    </div>
  );
};

export default Pagination;
