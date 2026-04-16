import { Pressable, StyleSheet, Text, View } from "react-native";
import CheckboxChecked from "../assets/checkbox-checked.svg";
import CheckboxUnchecked from "../assets/checkbox-unchecked.svg";
import DeleteIcon from "../assets/delete-icon.svg";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../redux/slices/todoSlice";

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
  return (
    <View style={styles.itemContainer}>
      <Pressable style={styles.itemCheckBox} hitSlop={10}
        onPress={() => dispatch(updateTodo(todo.id))}>
        {todo.state === "todo" ?
          <CheckboxUnchecked width={20} height={20} />
          : <CheckboxChecked width={20} height={20} style={styles.itemCheckboxCheckedIcon}/>}
      </Pressable>
      <Text style={[styles.itemText, 
        todo.state === "done" && styles.itemTextChecked]}>
        {todo.text}
      </Text>
      <Pressable
        style={[styles.deleteButton, 
            styles.deleteButtonDone]}
        hitSlop={10}
        onPress={() => dispatch(deleteTodo(todo.id))}
      >
        <DeleteIcon width={20} height={20} />
      </Pressable>
    </View>
  );
};

export default TodoItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f7f8fa",
  },
  itemCheckBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
  },
  itemCheckboxCheckedIcon: {
    shadowColor: "#000000",
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  itemText: {
    marginRight: "auto",
    paddingRight: 25,
    fontSize: 15,
    lineHeight: 20,
    color: "#737373",
  },
  itemTextChecked: {
    opacity: 0.3,
    textDecorationLine: "line-through",
  },
  deleteButton: {
    opacity: 0.8,
  },
  deleteButtonDone: {
    opacity: 0.3,
  },
});
