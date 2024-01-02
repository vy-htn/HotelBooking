import React from 'react';
import './css/daterange.css';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite-rtl.css';

function MyComponent() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return (
        <div>
            <DateRangePicker
                cleanable={false}
                ranges={[]}
                defaultValue={[today, tomorrow]}
                disabledDate={(date) => date.getTime() < today.getTime()}
                renderValue={(value) => {
                    if (value && value.length === 2) {
                        return `${value[0].toLocaleDateString()} → ${value[1].toLocaleDateString()}`;
                    }
                    return '';
                }}
            />
        </div>
    );
};

export default MyComponent;
