import React, { Fragment, useEffect, useState } from 'react';
import campusService from '../../services/campus/campus.service';
import { useSelector } from 'react-redux';
import { FiCheck, FiPlus, FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

function AssignUnit() {
  const navigate = useNavigate()
  const { organization } = useSelector((state) => state?.organizationSlice);
  const main = useSelector((state) => state);

  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [assignedUnits, setAssignedUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [unitsRes, adminsRes, assignedUnits] = await Promise.all([
        campusService.allUnassignedUnits(organization?._id),
        campusService.allUnassignedAdmin(organization?._id),
        campusService.allAssignedUnits(organization?._id)
      ]);
      // console.log("assignedUnits", assignedUnits);

      setUnits(unitsRes?.data?.data || []);
      setAdmins(adminsRes?.data?.data || []);
      setAssignedUnits(assignedUnits?.data?.data || []);
    } catch (err) {
      // console.log("1111", err);

      setError(err.message || 'An error occurred while fetching data.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if (organization?._id) {
      fetchData();
    }
  }, [organization?._id]);

  const handleAssign = async () => {
    if (!selectedUnit || !selectedAdmin) return;
    setAssigning(true);
    setError(null);
    try {
      const dataObject = {
        adminId: selectedAdmin._id,
        unitId: selectedUnit._id,
        enterpriseId: organization?._id
      }
      await campusService.assignAdminToUnit(dataObject);
      toast.success("Unit assigned successfully")
      await fetchData();
      setSelectedUnit(null);
      setSelectedAdmin(null);
      setAssigning(false)
    } catch (err) {
      setAssigning(false);

      setError(err || 'An error occurred during assignment.');
      console.error('Error assigning:', err);
    } finally {
      setAssigning(false);
    }
  };

  const handleAddUnit = () => {
    navigate("/create/unit")
  };

  const handleAddAdmin = () => {
    navigate("/create/admin")
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Assign Unit</h2>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Unit Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Unit</label>
              <button
                onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                className="w-[100%] px-4 py-2 border rounded-md border-gray-300 bg-white text-gray-900 shadow-custom-light dark:bg-fullBackgroungDark dark:text-white dark:border-gray-600 dark:focus:ring-lightButton text-left flex justify-between items-center"
                disabled={loading}
                aria-label="Select a unit"
              >
                <span>{selectedUnit ? selectedUnit.name : 'Select a unit'}</span>
                <span> {isUnitDropdownOpen ? <FiArrowUp /> : <FiArrowDown />}</span>
              </button>
              <Transition
                show={isUnitDropdownOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >
                <div className="absolute z-10 mt-1 w-[100%] rounded-md border border-gray-300 bg-white text-gray-900 shadow-custom-light dark:bg-fullBackgroungDark dark:text-white dark:border-gray-600 dark:focus:ring-lightButton flex flex-col max-h-60">
                  <div className="flex-1 overflow-y-auto">
                    {units.map((unit) => (
                      <div
                        key={unit._id}
                        onClick={() => {
                          setSelectedUnit(unit);
                          setIsUnitDropdownOpen(false);
                        }}
                        className={`px-4 py-2 flex items-center cursor-pointer ${selectedUnit?._id === unit._id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 hover:dark:bg-fullBackgroungDark/10'
                          }`}
                        aria-selected={selectedUnit?._id === unit._id}
                      >
                        {selectedUnit?._id === unit._id && (
                          <FiCheck className="mr-2 text-blue-700 dark:text-blue-300" />
                        )}
                        {unit.name}
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-2 border-gray-300 bg-white text-gray-900 shadow-custom-light dark:bg-fullBackgroungDark dark:text-white dark:border-gray-600 dark:focus:ring-lightButton rounded-b-md">
                    <button
                      onClick={handleAddUnit}
                      className="w-[100%] flex justify-center items-center gap-2 px-4 py-2 border-[.10rem] border-dashed border-blueBorder dark:border-orangeBorder text-blueBorder dark:text-orangeBorder rounded"
                    >
                      <FiPlus />
                      <span>Add Unit</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>

            {/* Admin Dropdown */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Admin</label>
              <button
                onClick={() => setIsAdminDropdownOpen(!isAdminDropdownOpen)}
                className="w-[100%] px-4 py-2 border rounded-md border-gray-300 bg-white text-gray-900 shadow-custom-light dark:bg-fullBackgroungDark dark:text-white dark:border-gray-600 dark:focus:ring-lightButton text-left flex justify-between items-center"
                disabled={loading}
                aria-label="Select an admin"
              >
                <span>{selectedAdmin ? selectedAdmin.firstName : 'Select an admin'}</span>
                <span> {isAdminDropdownOpen ? <FiArrowUp /> : <FiArrowDown />}</span>
              </button>
              <Transition
                show={isAdminDropdownOpen}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-2"
              >
                <div className="absolute z-10 mt-1 w-[100%] rounded-md border border-gray-300 bg-white text-gray-900 shadow-custom-light dark:bg-fullBackgroungDark dark:text-white dark:border-gray-600 dark:focus:ring-lightButton flex flex-col max-h-60">
                  <div className="flex-1 overflow-y-auto">
                    {admins.map((admin) => (
                      <div
                        key={admin._id}
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setIsAdminDropdownOpen(false);
                        }}
                        className={`px-4 py-2 flex flex-col rounded-t-md cursor-pointer ${selectedAdmin?._id === admin._id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'hover:bg-gray-100 hover:dark:bg-fullBackgroungDark/10'
                          }`}
                        aria-selected={selectedAdmin?._id === admin._id}
                      >
                        <div className="flex items-center gap-1">
                          <span>
                            {selectedAdmin?._id === admin._id && (
                              <FiCheck className="mr-2 text-blue-700 dark:text-blue-300" />
                            )}
                          </span>
                          <div className="flex flex-col">
                            <span>{admin.firstName}</span>
                            <span>{admin.email}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t p-2 border-gray-300 bg-white text-gray-900 shadow-custom-light dark:bg-fullBackgroungDark dark:text-white dark:border-gray-600 dark:focus:ring-lightButton rounded-b-md">
                    <button
                      onClick={handleAddAdmin}
                      className="w-[100%] flex items-center justify-center gap-2 px-4 py-2 border-[.10rem] border-dashed border-blueBorder dark:border-orangeBorder text-blueBorder dark:text-orangeBorder rounded"
                    >
                      <FiPlus />
                      <span>Add Admin</span>
                    </button>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
          <button
            onClick={handleAssign}
            disabled={assigning}
            className={`save ${!selectedUnit || !selectedAdmin || assigning ? 'opacity-50 cursor-not-allowed' : ''
              }`}          >
            {assigning ? (
              <span className="flex items-center justify-center">
                <ImSpinner9 className="animate-spin mr-2" />
                Submitting...
              </span>

            ) : (
              'Assign'
            )}
          </button>
          {
            error &&
            <div className="p-4 mt-2 text-red-500 bg-red-100 rounded-md">
              {error}
              <button
                onClick={fetchData}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Retry
              </button>
            </div>
          }

          {assignedUnits && assignedUnits.length > 0 ? (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Assigned Units
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {assignedUnits.map((item) => {
                  const admin = item.unit_head;
                  return (
                    <div
                      key={item._id}
                      className="bg-cardBgLight dark:bg-cardBgDark/80 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      {/* Unit Info */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.email} • {item.phone}
                          </p>
                        </div>
                        {/* <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-semibold text-sm">
                          {item.name.charAt(0).toUpperCase()}
                        </div> */}
                      </div>

                      {/* Divider */}
                      <hr className="border-gray-200 dark:border-gray-700 my-3" />

                      {/* Admin Info */}
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-700 dark:text-green-300 text-xs font-medium">
                          {admin.firstName.charAt(0)}
                          {admin.lastName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {admin.firstName} {admin.lastName}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {admin.email}
                          </p>
                        </div>
                      </div>

                      {/* Optional: Show assignment date */}
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 text-right">
                        Assigned on {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

        </>
      )}
    </div>
  );
}

export default AssignUnit;