import React from 'react'
import { Box } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { HomeStyles } from "./HomeStyles";


const MultiColorProgressBar = (props) => {
    const parent = props;
    const colors = parent.colors;
    const remainingProgress = 100 - parent.readings.reduce((acc, obj) => {
        return acc + obj.value;
    }, 0);

    let bars =
        parent.readings &&
        parent.readings.length &&
        parent.readings.map(function (item, i) {
            if (item.value > 0) {
                return (
                    <Tooltip title={item.msg +" " +  item.value}>
                    <Box
                        sx={HomeStyles.bar}
                        style={{ backgroundColor: colors[i], width: item.value + "%" }}
                        key={i}
                    ></Box>
                    </Tooltip>
                );
            }
        });

    return (
        <div style={{ width: "100%" }}>
            <div >
                {bars == "" ? "" : bars}
                <Box
                sx={HomeStyles.bar}
                    style={{ backgroundColor: "#E0E0E0", width: remainingProgress + "%" }}
                    key={parent.readings.length}
                ></Box>
            </div>
        </div>
    );
};


export default MultiColorProgressBar