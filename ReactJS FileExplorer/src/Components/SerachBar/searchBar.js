import "../SerachBar/searchBar.css"
export const SearchBar = (props) =>{

    const handelchange = (event) =>{
        props.setname(event.target.value);
    }
    return (
        <input
        type="text"
        class="customSearchBox"
        placeholder="Enter the name of File/Folder"
        onChange={handelchange}
      />
    )
}