import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Input, Box, Label, Button, HelpText } from "@twilio-paste/core";
import axios from "axios";
import {
  useComboboxPrimitive,
  useMultiSelectPrimitive,
  useFormPillState,
  ComboboxListbox,
  ComboboxListboxGroup,
  FormPill,
  FormPillGroup,
  ComboboxListboxOption,
  Option,
  Select,
} from "@twilio-paste/core";
import { useUID, useUIDSeed } from "react-uid";

const baseURL: string = "http://localhost:3000/";

// TODO: Role check logic
// TODO: Update Nav Bar

type Question = {
  id: number;
  question: string;
};

const styles = {
  submitButton: {
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "end",
    gap: 10,
  },
};

const CreateEvaluation = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: 999, question: "what?" },
  ]);
  const [title, setTitle] = useState<string>("");
  const [selectedQuestions, setSelectedQuestions] = useState<Array<string>>([]);
  const items = [{ name: "ryder" }];
  const [apprentices, setApprentices] = useState([]);
  const [selectedApprentice, setSelectedApprentice] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState([...items]);
  const [managers, setManagers] = useState([]);

  const seed = useUIDSeed();
  const formPillState = useFormPillState();
  const inputId = seed("input-element");
  let role = 3;

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedQuestions((prev) => [...prev, value]);
    } else {
      setSelectedQuestions((prev) => prev.filter((x) => x !== value));
    }
  };

  useEffect(() => {
    getReviewers();
    getQuestions();
    getApprentices();
  }, []);

  const getQuestions = () => {
    // TODO: Connect to backend /api/v1/questions
    axios.get(baseURL + "questions").then((res) => {
      let newQuestions = res.data;
      setQuestions(newQuestions);
    });
  };

  const getReviewers = () => {
    // TODO: /api/v1/users/
    axios.get(baseURL + "users").then((res) => {
      let users = res.data;
      let currentReviewers = users.filter((user: any) => user.roleID !== "1");
      setFilteredItems(currentReviewers);
    });
  };

  const getApprentices = () => {
    if (role === 4) {
      // TODO: /api/v1/users/apprentices/

      axios.get(baseURL + "apprentices").then((res) => {
        setApprentices(res.data);
      });
    } else {
      // TODO: GET apprentice assigned api/v1/users/managers/id/apprentices
      //       grab id from meta data
      axios.get(baseURL + "apprenticeByManagerID").then((res) => {
        setApprentices(res.data);
      });
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: POST eval api/v1/evalutations
    //       on post have confirm modal or redirect
    // selected reviews array are stored in selectedItems
    e.preventDefault();
    let reviewData = Object.keys(selectedItems).map((key: any) => {
      return selectedItems[key].id;
    });

    let data = {
      title,
      apprenticeId: selectedApprentice,
      managerId: "manager id",
      reviewerIds: reviewData,
      questionIds: selectedQuestions,
    };
    console.log(data);
    axios.post(baseURL + "questions" + 1, data).then((res) => {
      console.log("POST Response:", res);
    });
  };

  const handleChange = () => {
    console.log("change handled 0_0");
  };

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultiSelectPrimitive<any>({});

  const handleSelectItemOnClick = React.useCallback(
    (selectedItem) => {
      addSelectedItem(selectedItem);

      setFilteredItems((currentFilteredItems) =>
        currentFilteredItems.filter((item) => item !== selectedItem)
      );
    },
    [addSelectedItem, setFilteredItems]
  );

  const handleRemoveItemOnClick = React.useCallback(
    (selectedItem) => {
      removeSelectedItem(selectedItem);

      setFilteredItems((currentFilteredItems) =>
        [...currentFilteredItems, selectedItem].sort()
      );
    },
    [removeSelectedItem]
  );

  const {
    getComboboxProps,
    getInputProps,
    getItemProps,
    getLabelProps,
    getMenuProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    selectedItem,
    selectItem,
  } = useComboboxPrimitive({
    items: filteredItems,
    initialInputValue: "",
    onSelectedItemChange: ({ selectedItem: selected }) => {
      if (selected != null) {
        handleSelectItemOnClick(selected);
      }
      //   selectItem(null);
    },
  });

  return (
    // <Box marginBottom="space10" marginTop="space10" padding="space100">
    <Box style={{padding: "0 25px"}}>
      <Card>
        <h2>New Evaluation</h2>
        <Box marginBottom="space80">
          <Label htmlFor="email_address" required>
            Title
          </Label>
          <Input
            aria-describedby="title_help_text"
            id="title"
            name="title"
            type="text"
            placeholder="Hatch Eval #1"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Box>

        <Label htmlFor="apprentice_select">Select Apprentice</Label>
        <Box marginBottom="space80">
          <Select
            id="apprentice_select"
            onChange={(e) => setSelectedApprentice(e.target.value)}
            required
          >
            {apprentices.map((apprentice: any, i: any) => {
              return (
                <Option value={apprentice.id} id={i}>
                  {apprentice.Name}
                </Option>
              );
            })}
          </Select>
        </Box>

        <Box padding={"space100"} marginBottom="space80">
          <div>
            <h2>Select questions to appear on evaluation</h2>
            {questions.map((question, i) => (
              <label key={i}>
                <input
                  type="checkbox"
                  name="selected-questions"
                  value={question.id}
                  onChange={handleChecked}
                />{" "}
                {question.question}
                <br />
              </label>
            ))}
          </div>
        </Box>
        <>
          <Box marginBottom="space40" position="relative">
            <Label htmlFor={inputId} {...getLabelProps()}>
              Choose a Reviewer
            </Label>
            <Box {...getComboboxProps({ role: "combobox" })}>
              <Input
                id={inputId}
                type="text"
                {...getInputProps({
                  ...getDropdownProps({
                    preventKeyAction: isOpen,
                    ...getToggleButtonProps({ tabIndex: 0 }),
                  }),
                })}
                value={""}
              />
            </Box>
            <ComboboxListbox hidden={!isOpen} {...getMenuProps()}>
              <ComboboxListboxGroup>
                {filteredItems.map((filteredItem: any, index) => (
                  <ComboboxListboxOption
                    highlighted={highlightedIndex === index}
                    variant="default"
                    key={index}
                    {...getItemProps({
                      item: filteredItem,
                      index,
                      key: filteredItem.id,
                    })}
                  >
                    {filteredItem.name}
                  </ComboboxListboxOption>
                ))}
              </ComboboxListboxGroup>
            </ComboboxListbox>
          </Box>
          <FormPillGroup {...formPillState} aria-label="Selected components">
            {selectedItems.map((item: any, index) => {
              return (
                <FormPill
                  {...getSelectedItemProps({
                    selectedItem,
                    index,
                    key: item.id,
                  })}
                  tabIndex={null}
                  {...formPillState}
                  onDismiss={() => handleRemoveItemOnClick(item)}
                >
                  {item.name}
                </FormPill>
              );
            })}
          </FormPillGroup>
          <br />
        </>
        <Box justifyContent="end">
          <Button
            size="default"
            onClick={handleSubmit}
            type="submit"
            variant="primary"
          >
            Submit
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default CreateEvaluation;

//------------------- Paste Checkbox if there is time I want to revisit -------------
{
  /* <CheckboxGroup
            name="questions_group"
            legend="Select the answers to appear on the evaluation."
            // onChange={handleQuestions}
          >
            {questions.map((obj) => (
              <Checkbox
                name={obj.question}
                id={obj.question}
                value={obj.question}
                key={obj.id}
                // checked={false}
                onChange={handleChecked}
              >
                {obj.question}
              </Checkbox>
            ))}
          </CheckboxGroup> */
}
