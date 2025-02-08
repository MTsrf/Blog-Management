import dynamic from "next/dynamic";
import Form from "next/form";
const SearchFormReset = dynamic(() => import("@/components/SearchFormReset"));
const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action="/posts"
      scroll={false}
      className="search-form max-w-3xl w-full min-h-[80px] bg-white border-[5px] border-black rounded-[80px] text-[24px] mt-8 px-5 flex flex-row items-center gap-5"
    >
      <input
        name="query"
        defaultValue={query}
        className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto outline-none"
        placeholder="Search Blog"
      />
      <div className="flex gap-2 items-center">
        {query && <SearchFormReset />}
        <button
          type="submit"
          className="size-[50px] rounded-full bg-black flex justify-center items-center !important text-white"
        >
          S
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
