import { FormControlLabel, Switch } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

type Props = {
  cssClassName: any;
  labelText: any;
  control: any;
  elementName: any;
};
const MySwitch = (props: Props) => {
  // const [isExamDurationAuto, setIsExamDurationAuto] = useState<boolean>(true);
  return (
    <>
      <Controller
        name={props.elementName}
        control={props.control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                defaultChecked
                // onChange={() => setIsExamDurationAuto(!isExamDurationAuto)}
                color="primary"
              />
            }
            label={props.labelText}
            labelPlacement="start"
            className={props.cssClassName}
          />
        )}
      />
    </>
  );
};

export default MySwitch;
