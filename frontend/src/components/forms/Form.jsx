import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Form = ({
  fields,
  buttonText,
  onSubmit,
  footerContent,
  backgroundColor,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    onSubmit(data);
  };

  return (
    <form
      className="form space-y-4"
      style={{ backgroundColor: backgroundColor }}
      onSubmit={handleSubmit}
    >
      {fields.map((field, index) => (
        <div className="container_inputs" key={index}>
          {field.label && (
            <label
              htmlFor={field.name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500 dark:text-gray-400"
            >
              {field.label}
            </label>
          )}
          {field.type === "select" ? (
            <Select name={field.name}>
              <SelectTrigger className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option, idx) => (
                  <SelectItem key={idx} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              name={field.name}
              placeholder={field.placeholder}
              type={field.type || "text"}
              defaultValue={field.value}
              required={field.required}
              disabled={field.disabled}
            />
          )}
        </div>
      ))}
      {buttonText && <Button type="submit">{buttonText}</Button>}
      {footerContent && <div>{footerContent}</div>}
    </form>
  );
};

export default Form;
