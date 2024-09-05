export function InputField({ type, placeholder, value, onChange }) {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={value}
            onChange={onChange}
        />
    );
}
