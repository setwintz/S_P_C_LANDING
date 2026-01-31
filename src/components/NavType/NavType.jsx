import React from "react";
import useNavbarType from "../../Hooks/useNavbarType";

const NavType = () => {
    const [navbarType, setNavbarType] = useNavbarType();
    const handleChange = (e) => {
        setNavbarType(e.target.value);
    };
    const navTypes = [
        {
            label: "Sticky",
            value: "sticky",
        },
        {
            label: "Static",
            value: "static",
        },
        {
            label: "Floating",
            value: "floating",
        },
       
    ];

    return (
        <div className="mt-7">
            <h4 className="text-gray-700 dark:text-gray-500 md:text-base text-sm dark:text-slate-300 mb-2 font-normal">
                Header Type
            </h4>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                {navTypes.map((item, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-2 p-2 border dark:border-gray-600 rounded-0 cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        <input
                            type="radio"
                            name="navbarType"
                            value={item.value}
                            checked={navbarType === item.value}
                            onChange={handleChange}
                            className="form-radio text-blue-600 dark:text-blue-400"
                        />
                        <span className="text-gray-700 dark:text-gray-500 text-sm">{item.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default NavType;