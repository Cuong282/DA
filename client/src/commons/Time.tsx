import moment from "moment";
import React, { memo, useEffect, useState } from "react";

const Time = () => {
    const [hours, setHours] = useState(new Date());
    useEffect(() => {
        const timmer = setInterval(() => {
            setHours(new Date());
        }, 1000);
        return () => {
            clearInterval(timmer);
        };
    }, []);

    return (
        <p className="text-theme-text-tertiary pl-2">
            {moment(hours).format("HH:mm:ss")}
        </p>
    );
};

export default memo(Time);
