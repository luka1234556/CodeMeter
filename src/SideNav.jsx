
const SideNav = ({ sections }) => {
  return (
    <nav 
    className="fixed md:flex left-0 top-[40%] z-20 hidden">
      <ul 
      className="space-y-2 cursor-pointer">
        {sections.map((item) => (
          <button
          key={item.id}
          onClick={() => {
            const target = document.getElementById(item.id);
            if (target) target.scrollIntoView({ behavior: "smooth", block: "end" });
          }}
          className={`p-4 rounded-r-full transition-all duration-200 border-indigo-100
          ${item.style} w-18 -translate-x-6 flex justify-end hover:translate-x-0
          text-2xl border-r border-y cursor-pointer
          `}
          >
            {item.icon}
          </button>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;