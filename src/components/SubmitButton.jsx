export function SubmitButton({ text }) {
    return (
        <button 
            type="submit" 
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
            {text}
        </button>
    );
}
