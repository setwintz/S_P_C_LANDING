

import layout from "./layout";
import authCustomerSlice from "./reducer/auth/authCustomerSlice";
import capabilitySlice from "./reducer/capability/capabilitySlice";
import organizationSlice from "./reducer/organization/organizationSlice";
import onPageSlice from "./reducer/test/onCreatePageSlice";
import showTabSlice from "./reducer/layout/showTabSlice";
import tenantSlice  from "./reducer/tenant/tenantSlice";
import testSlice from "./reducer/test/testSlice";

import toastSlice from "./reducer/toastSlice"
import unSavedChangesSlice from "./reducer/unSavedChangesSlice";





const rootReducer = {
    layout,
    authCustomerSlice,
    capabilitySlice,
    organizationSlice,
    onPageSlice,
    showTabSlice,
    tenantSlice,
    toastSlice,
    unSavedChangesSlice


    // testSlice
}


export default rootReducer