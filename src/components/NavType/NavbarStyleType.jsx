import React from "react";
import useNavbarStyleType from "../../Hooks/useNavbarStyleType";

const NavbarStyleType = () => {
    const [navbarStyleType, setNavbarStyleType] = useNavbarStyleType();
    const handleChange = (e) => {
        setNavbarStyleType(e.target.value);
    };
    const navTypes = [
        {
            label: "Curverd",
            value: "curverd",
        },
        {
            label: "Square",
            value: "square",
        },
    ];

    return (
        <div className="mt-7">
            <h4 className="text-gray-700 dark:text-gray-500 md:text-base text-sm dark:text-slate-300 mb-2 font-normal">
                Navbar Type
            </h4>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                {navTypes.map((item, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-2 p-2 border dark:border-gray-600 rounded-0 cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        <input
                            type="radio"
                            name="navbarStyleType"
                            value={item.value}
                            checked={navbarStyleType === item.value}
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

export default NavbarStyleType;