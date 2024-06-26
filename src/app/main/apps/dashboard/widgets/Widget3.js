import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { memo, useState } from 'react';

function Widget3({ widget }) {
  let keyOfObj = Object.keys(widget);
  const [currentRange, setCurrentRange] = useState(keyOfObj[1]);

  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
  }

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-start">
      <div className="flex items-center justify-between px-4 pt-8">
        <Select
          native
          className="mx-16"
          classes={{ root: 'py-8 font-medium opacity-75' }}
          value={currentRange}
          onChange={handleChangeRange}
          inputProps={{
            name: 'currentRange'
          }}
          disableUnderline
          variant="standard"
        >
          {/* name of topics */}
          {Object.entries(widget).map(([key, n]) => {
            return (
              <option key={key} value={key}>
                {key}
              </option>
            );
          })}
        </Select>
        <IconButton aria-label="more">
          <Icon>more_vert</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-18 text-blue-800 font-normal mb-8">Issues</Typography>
        <Typography className="text-72 font-semibold leading-none text-blue tracking-tighter">
          {widget[currentRange]}
        </Typography>
      </div>
      {/* <Typography className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium" color="textSecondary">
        <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count[currentRange]}</b>
      </Typography> */}
    </Paper>
  );
}

export default memo(Widget3);
