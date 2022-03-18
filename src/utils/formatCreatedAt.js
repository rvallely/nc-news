const formatCreatedAt = (created_at) => {
    let [date, time] = created_at.split('T')
    time = time.slice(0, 5);
    return [date, time];
}

export default formatCreatedAt;