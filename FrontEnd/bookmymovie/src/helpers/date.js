const date = Array.from({length:4},(_,index)=>{
    const date = new Date();
    date.setDate(date.getDate()+index);

    return {
        date: date.toISOString().split("T")[0],
        day: date.toLocaleDateString("en-US",{weekday : "short",}),
        month: date.toLocaleDateString("en-US",{month:"short"}),
        displayDate:date.toLocaleDateString("en-US",{day:"2-digit"}),
    };
});

 export default date;