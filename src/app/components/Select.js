const Select = ({ deviceType, devices, updateDevice }) => {
  return (
    <div className="column">
      <label>{`選擇${deviceType}:`}</label>
      <select onChange={(e) => updateDevice(e.target.value)}>
        {devices?.map((device) => {
          return (
            <option
              key={`${deviceType.charAt(0).toLowerCase() + deviceType.slice(1)}-${
                device.deviceId
              }`}
              value={device.deviceId}
            >
              {device.label || `${deviceType} ${device.deviceId.substring(0, 8)}`}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
