"use client";
import React from "react";
import DropDown from "@/components/common/DropDown";
import CustomLabel from "@/components/common/CustomLabel";
import Button from "@/components/common/Button";
import { svgAddIcon, svgEditIcon } from "@/utils/svgIcons";
import type { TypeFeedback } from "@/types/dataTypes";

interface FormFeedbackProps {
  oldFeedback?: TypeFeedback;
  user_id: number;
}
const FormFeedback = (props: FormFeedbackProps) => {
  const { oldFeedback, user_id } = props;
  const categories = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  const statusArray = ["suggestion", "planned", "in-progress", "live"];

  const [formData, setFormData] = React.useState(
    oldFeedback || {
      title: "",
      category: categories[0],
      status: statusArray[0],
      description: "",
    },
  );

  const [category, setCategory] = React.useState<string>(
    oldFeedback?.category || categories[0],
  );
  const [status, setStatus] = React.useState<string>(
    oldFeedback?.status || statusArray[0],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleCancel = () => {
    setCategory(oldFeedback?.category || categories[0]);
    setStatus(oldFeedback?.status || statusArray[0]);
    setFormData(
      oldFeedback || {
        title: "",
        category: categories[0],
        status: statusArray[0],
        description: "",
      },
    );
  };

  return (
    <form
      id="newFeedback"
      onSubmit={handleSubmit}
      className="relative rounded-10 bg-white px-6 pb-6 pt-11 sm:px-10 sm:pb-10 sm:pt-[52px]"
    >
      <span className=" absolute left-6 top-0 -translate-y-1/2 text-3xl sm:left-[42px] sm:text-4xl">
        {oldFeedback ? svgEditIcon : svgAddIcon}
      </span>
      <p className="mb-10 text-lg font-bold tracking-tighter text-dark-700 sm:text-2xl ">
        {oldFeedback ? `Editing ‘${oldFeedback.title}’` : "Create New Feedback"}
      </p>
      <div className="mb-8 flex flex-col gap-y-6">
        <CustomLabel
          label="Feedback Title"
          description="Add a short, descriptive headline"
        >
          <input
            type="text"
            id="inputTitle"
            className="custom-form-focus block w-full rounded-5 bg-dark-200 px-4 py-3.5 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </CustomLabel>
        <CustomLabel
          label="Category"
          description="Choose a category for your feedback"
        >
          <DropDown
            id="inputCategory"
            options={categories}
            value={category}
            onChange={setCategory}
          />
        </CustomLabel>
        {oldFeedback && (
          <CustomLabel label="Update Status" description="Change feature state">
            <DropDown
              id="inputStatus"
              options={statusArray}
              value={status}
              onChange={setStatus}
            />
          </CustomLabel>
        )}
        <CustomLabel
          label="Feedback Detail"
          description="Include any specific comments on what should be improved, added, etc."
        >
          <textarea
            id="inputDetails"
            className="custom-form-focus block w-full rounded-5 bg-dark-200 p-4 text-xs font-normal text-dark-700 placeholder:text-dark-700/60 sm:px-6 sm:text-md"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={5}
          />
        </CustomLabel>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row-reverse">
        <Button classe="violet" type="submit" isFlex>
          {oldFeedback ? "Save Changes" : "Add Feedback"}
        </Button>
        <Button onClick={handleCancel} classe="dark" type="button" isFlex>
          Cancel
        </Button>
        {oldFeedback && (
          <div className="w-full">
            <Button classe="orange" type="button" isFlex>
              Delete
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default FormFeedback;
