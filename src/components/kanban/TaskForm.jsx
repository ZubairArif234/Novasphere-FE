import { Button, Select, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import { useTaskStore } from "../../stores/task.store";
import { DateInput } from '@mantine/dates';
const TaskForm = ({data,close}) => {
     const { loading, create,update, getAll } = useTaskStore(useShallow((state) => state));
    
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: data?.title || "",
      description: data?.description ||"",
      status: data?.status || "",
      dueDate: data?.dueDate && new Date(data?.dueDate) || "",
    },

    validate: {
      title: (value) =>
        value.length < 3 ? "Title must have at least 3 characters" : null,
      description: (value) => (!value ? "Please enter description" : null),
      status: (value) => (!value ? "Please select status" : null),
      dueDate: (value) => (!value ? "Please select due date" : null),
    },
  });
  console.log(data);
  
  const handleSubmit = async (values) => {
    let res;
    if(data){
        res= await update(values ,data?.id)
    }else{
        res= await create(values)

    }
   if(res){
    form.reset()
    await getAll()
    close()
   }
   };
  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)} className="flex flex-col gap-4">
        <TextInput
          label="Enter Title"
          placeholder="Title"
          variant="filled"
          size="lg"
          {...form.getInputProps("title")}
        />
        <Textarea
          minRows={4}
          maxRows={7}
          label="Enter Description"
          placeholder="Description"
          variant="filled"
          size="lg"
          {...form.getInputProps("description")}
        />
        <Select
          variant="filled"
          size="lg"
          label="Select Status"
          placeholder="Status"
          data={["Pending", "In Progress", "Done"]}
          {...form.getInputProps("status")}
        />
        <DateInput
         variant="filled"
          size="lg"
      label="Enter Due Date"
      placeholder="Select Date"
      minDate={new Date()}
      {...form.getInputProps("dueDate")}
    />
        <div className="flex justify-end">
          <Button loading={loading} type="submit" color="cyan" size="lg">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
