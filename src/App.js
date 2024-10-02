import { useState, useEffect } from "react";
import './App.css'
const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [images, setImages] = useState([]);

    const [currentColor, setCurrentColor] = useState('#FFFFFF');
    const [colorHistory, setColorHistory] = useState(['#FFFFFF']);
    const [autoChange, setAutoChange] = useState(false);

    const addTodo = (e) => {
        e.preventDefault();
        if (newTodo.trim() !== '') {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const toggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const searchImage = async(e) => {
        e.preventDefault();
        const query = searchTerm.trim();
        if (query) {
            try {
                const response = await fetch(`https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query}&image_type=photo`);
                const data = await response.json();
                setImages(data.hits);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
    };

    const generateRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        setCurrentColor(color);
        setColorHistory([...colorHistory, color]);
    };

    const undoColor = () => {
        if (colorHistory.length > 1) {
            const newHistory = colorHistory.slice(0, -1);
            setColorHistory(newHistory);
            setCurrentColor(newHistory[newHistory.length - 1]);
        }
    };

    const toggleAutoChange = () => {
        setAutoChange(!autoChange);
    };

    useEffect(() => {
        let interval;
        if (autoChange) {
            interval = setInterval(generateRandomColor, 1000);
        }
        return () => clearInterval(interval);
    }, [autoChange]);

    return ( <
        div className = "container" >
        <
        div className = "section" >
        <
        h2 className = "header" > Todo List < /h2> <
        form onSubmit = { addTodo }
        className = "form" >
        <
        input type = "text"
        value = { newTodo }
        onChange = {

            (e) => setNewTodo(e.target.value)
        }
        placeholder = "Nội dung công việc"
        className = "input" /
        >
        <
        button type = "submit"
        className = "button" > Thêm < /button> < /
        form > <
        ul className = "list" > {
            todos.map((todo, index) => ( <
                li key = { index }
                className = "listItem"
                style = {
                    { textDecoration: todo.completed ? 'line-through' : 'none' }
                } >
                <
                input type = "checkbox"
                checked = { todo.completed }
                onChange = {
                    () => toggleTodo(index)
                }
                className = "checkbox" /
                >
                { todo.text } <
                /li>
            ))
        } <
        /ul> < /
        div >

        <
        div className = "section" >
        <
        h2 className = "header" > Tìm kiếm hình ảnh < /h2> <
        form onSubmit = { searchImage }
        className = "form" >
        <
        input type = "text"
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value)
        }
        placeholder = "Tìm kiếm hình ảnh"
        className = "input" /
        >
        <
        button type = "submit"
        className = "button" > Tìm < /button> < /
        form > <
        div className = "imageContainer" > {
            images.length > 0 ? (
                images.map(img => ( <
                    img key = { img.id }
                    src = { img.previewURL }
                    alt = { img.tags }
                    className = "image" / >
                ))
            ) : ( <
                p > Không tìm thấy hình ảnh. < /p>
            )
        } <
        /div> < /
        div >

        <
        div className = "section" >
        <
        h2 className = "header" > Random Color < /h2> <
        div className = "colorRectangle"
        style = {
            { backgroundColor: currentColor }
        } > < /div> <
        div className = "buttonContainer" >
        <
        button onClick = { generateRandomColor }
        className = "button" > Change Color < /button> <
        button onClick = { toggleAutoChange }
        className = "button" > { autoChange ? 'Stop Auto' : 'Start Auto' } < /button> <
        button onClick = { undoColor }
        className = "button" > Undo < /button> < /
        div > <
        div className = "colorInfo" >
        <
        div >
        <
        p className = "label" > Color History: < /p> <
        div className = "colorHistoryContainer" > {
            colorHistory.map((color, index) => ( <
                div key = { index }
                className = "colorSwatch"
                style = {
                    { backgroundColor: color }
                }
                title = { color } > < /div>
            ))
        } <
        /div> < /
        div > <
        /div> < /
        div > <
        /div>
    );
};

export default App;