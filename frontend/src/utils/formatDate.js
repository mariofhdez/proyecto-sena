function fromTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const newDate = date.toISOString().split('T')[0];
    return newDate;
}

export { fromTimestampToDate };