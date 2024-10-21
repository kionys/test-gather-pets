const SubHeader = () => {
  return (
    <div className="hidden sm:flex items-center md:justify-between lg:justify-evenly gap-3 w-full h-auto py-2 rounded-2xl bg-transparent pl-4">
      <input
        className="border-zinc-300 border bg-zinc-100 h-12 rounded-full px-4 py-2 w-[360px]"
        type="text"
        name="search"
        placeholder="Search"
      />
      <button className="border-zinc-300 border bg-zinc-100 h-12 rounded-full px-4 py-2 w-fit">게시글 작성</button>
    </div>
  );
};
export default SubHeader;
