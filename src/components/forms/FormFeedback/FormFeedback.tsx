"use client";
import React from "react";
import DropDown from "@/components/common/DropDown";
import CustomLabel from "@/components/common/CustomLabel";
import Button from "@/components/common/Button";
import { svgAddIcon, svgEditIcon } from "@/utils/svgIcons";
import type { RequestType } from "@/types/dataTypes";

interface FormFeedbackPropsBase {
  edit?: false;
  request?: undefined;
}
interface FormFeedbackPropsWithEdit {
  edit: true;
  request: RequestType;
}
type FormFeedbackProps = FormFeedbackPropsBase | FormFeedbackPropsWithEdit;
const FormFeedback = (props: FormFeedbackProps) => {
  const { edit, request } = props;
  const formId = React.useId();
  const titleId = React.useId();
  const categoryId = React.useId();
  const statusId = React.useId();
  const detailsId = React.useId();
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusArray = ["suggestion", "planned", "in-progress", "live"];

  const [title, setTitle] = React.useState<string>(edit ? request.title : "");
  const [category, setCategory] = React.useState<string>(
    edit ? request.category : categories[0],
  );
  const [status, setStatus] = React.useState<string>(
    edit ? request.status : statusArray[0],
  );
  const [details, setDetails] = React.useState<string>(
    edit ? request.description : "",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(title, category, details);
  };

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      className="relative rounded-10 bg-white px-6 pb-6 pt-11"
    >
      <span className=" absolute left-6 top-0 -translate-y-1/2">
        {edit ? svgEditIcon : svgAddIcon}
      </span>
      <p className="mb-10 text-18 font-bold tracking-tighter text-dark-200 ">
        {edit ? `Editing ‘${request.title}’` : "Create New Feedback"}
      </p>
      <CustomLabel
        htmlFor={titleId}
        label="Feedback Title"
        description="Add a short, descriptive headline"
      >
        <input
          type="text"
          id={titleId}
          className="custom-form-focus block w-full rounded-5 bg-gray-200 px-4 py-3.5 text-13 font-normal text-dark-200 placeholder:text-dark-200/60"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </CustomLabel>
      <CustomLabel
        htmlFor={categoryId}
        label="Category"
        description="Choose a category for your feedback"
      >
        <DropDown
          id={categoryId}
          options={categories}
          value={category}
          onChange={setCategory}
        />
      </CustomLabel>
      {edit && (
        <CustomLabel
          htmlFor={statusId}
          label="Update Status"
          description="Change feature state"
        >
          <DropDown
            id={statusId}
            options={statusArray}
            value={status}
            onChange={setStatus}
          />
        </CustomLabel>
      )}
      <CustomLabel
        htmlFor={detailsId}
        label="Feedback Detail"
        description="Include any specific comments on what should be improved, added, etc."
      >
        <textarea
          id={detailsId}
          className="custom-form-focus block w-full rounded-5 bg-gray-200 p-4 text-13 font-normal text-dark-200 placeholder:text-dark-200/60"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={5}
        />
      </CustomLabel>
      <div className="flex flex-col gap-y-4 pt-4">
        <Button color="violet" type="submit" isFlex>
          {edit ? "Save Changes" : "Add Feedback"}
        </Button>
        <Button color="dark" type="button" isFlex>
          Cancel
        </Button>
        {edit && (
          <Button color="orange" type="button" isFlex>
            Delete
          </Button>
        )}
      </div>
    </form>
  );
};

export default FormFeedback;
