import React from "react";
import UserSuggestions from "@/app/utils/userSuggestions";
import {
  USER_TYPES,
  INDUSTRY_AREAS,
  COMPANY_STATUS_OPTIONS,
} from "@/app/utils/constant";
import FormField from "./formField";
import Select from "react-select";

function RoleSpecificForm({
  userType,
  userDetails,
  handleChange,
  handleUserSelect,
  handleBelongToSelect,
}) {
  const handleSelectChange = (selectedOption, fieldName) => {
    // Assuming you want to store the values in the form of an array of keys
    handleChange({
      target: {
        name: fieldName,
        value: selectedOption
          ? selectedOption.map((option) => option.value)
          : [],
      },
    });
  };

  const handleSingleSelectedChange = (selectedOption, fieldName) => {
    // Create a faux event object
    const event = {
      target: {
        name: fieldName,
        value: selectedOption ? selectedOption.value : "",
      },
    };
    handleChange(event);
  };

  const selectedValue = userDetails.industry
    ? INDUSTRY_AREAS.filter((option) =>
        userDetails.industry.includes(option.value)
      )
    : [];

  const selectedStatusOption =
    COMPANY_STATUS_OPTIONS.find(
      (option) => option.value === userDetails.status
    ) || null;

  return (
    <>
      {userType === "company" && (
        <div className="mb-3">
          <label htmlFor="companyStatus" className="form-label">
            Company Status
          </label>
          <Select
            id="companyStatus"
            name="status"
            value={selectedStatusOption}
            onChange={(option) => handleSingleSelectedChange(option, "status")} // Passing the field name here
            options={COMPANY_STATUS_OPTIONS}
            className="basic-single"
            classNamePrefix="select"
            isClearable={true} // Allows clearing the selected value
            placeholder="Select Company Status"
          />
          <label htmlFor="company member" className="form-label mt-3">
            Company members
          </label>
          <UserSuggestions
            handleUserSelect={handleBelongToSelect}
            userType={USER_TYPES.CONSULTANT}
          />
        </div>
      )}

      {userType === "consultant" && (
        <div className="row">
          <div className="col-6">
            <label htmlFor="consultantLocation" className="form-label">
              Consultant Location
            </label>
            <input
              type="text"
              className="form-control"
              id="consultantLocation"
              name="consultantLocation"
              value={userDetails.consultantLocation || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <FormField
              label="Education"
              name="education"
              type="text"
              value={userDetails.education}
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {userType === "entrepreneur" && (
        <div className="row">
          <div className="col">
            <FormField
              label="Mission"
              name="mission"
              type="textarea"
              value={userDetails.mission || ""}
              onChange={handleChange}
            />
            <br />
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="companyStatus" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                id="Status"
                name="status"
                value={userDetails.status || ""}
                onChange={handleChange}
              >
                <option value="">Please select...</option>
                <option value="">Hiring</option>
                <option value="Preparing">Looking for consultant</option>
                <option value="Bootstrap">Looking for grants</option>
              </select>
            </div>
            <div className="col-6">
              <FormField
                label="Education"
                name="education"
                type="text"
                value={userDetails.education}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="industry" className="form-label">
                Industry Area
              </label>
              <Select
                isMulti
                name="industry"
                options={INDUSTRY_AREAS}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={(option) => handleSelectChange(option, "industry")}
                value={selectedValue}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RoleSpecificForm;
