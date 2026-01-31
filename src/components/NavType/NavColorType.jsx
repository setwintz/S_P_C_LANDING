import React from "react";
import useNavbarType from "../../Hooks/useNavbarType";
import useNavbarColorType from "../../Hooks/useNavbarColorType";

const NavColorType = () => {
    const [navbarColorType, setNavbarColorType] = useNavbarColorType();
    const handleChange = (e) => {
        setNavbarColorType(e.target.value);
    };
    const navTypes = [
        {
            label: "White",
            value: "white",
        },
        {
            label: "Transparent",
            value: "transparent",
        },
        {
            label: "Black",
            value: "black",
        },
       
    ];

    return (
        <div className="mt-7">
            <h4 className="text-gray-700 dark:text-gray-500 md:text-base text-sm dark:text-slate-300 mb-2 font-normal">
                Navbar Type
            </h4>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
                {navTypes.map((item, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-2 p-2 border dark:border-gray-600 rounded-0 cursor-pointer transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                        <input
                            type="radio"
                            name="navbarColorType"
                            value={item.value}
                            checked={navbarColorType === item.value}
                            onChange={handleChange}
                            className="form-radio text-primary dark:text-primaryDark"
                        />
                        <span className="text-gray-700 dark:text-gray-500 text-xs">{item.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default NavColorType;