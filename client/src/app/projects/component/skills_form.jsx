"use client"
import { useRef, useState, useEffect, useImperativeHandle } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URLS } from "@/app/utils/constant";

export default function SkillsForm(props) {
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);
  const [isFirstInput, setIsFirstInput] = useState(false);

  useEffect(() => {
    const fetchData = async (value) => {
      axios.get(`${API_URLS.BASIC_URL}/suggestions?query=${value}`)
      .then((response) => {
        if (response.status === 200) {
          setSuggestions(response.data);
          console.log(`Skills loaded. ${response.data}`)
        }

        console.log(`Response status: ${response.status}`)
      })
      .catch((error) => {
        console.log(`Suggestions loading failed. Error: ${error}`)
      })
    }
    
    if (isFirstInput) {
        fetchData(inputValue);
    }
  }, [isFirstInput, inputValue]);

  const handleChange = (event) => {
    const { value } = event.target;
    setInputValue(value);

    if (value.length === 1) {
      setIsFirstInput(true);
      setShowList(true);
    } else if (value === '') {
        setSuggestions([])
        setIsFirstInput(false);
        setShowList(false);
    } else {
        setSuggestions(suggestions.filter(skill => skill.startsWith(value)))
        setIsFirstInput(false);
        setShowList(true);
    }
  }

  const handleSelect = (suggestion) => {
    setInputValue('');
    setSuggestions([]);
    setShowList(false);

    setSelectedSkill(selectedSkill => {
        if (!selectedSkill.includes(suggestion)) {
            const updatedSelectedSkill = [...selectedSkill, suggestion];
            props.getSkills(updatedSelectedSkill);
            return updatedSelectedSkill;
        }
        return selectedSkill;
    });
  }

  const handleDelete = (deletedSkill) => {
    setSelectedSkill((prevSelectedItem) => {
        const updatedSelectedItem = selectedSkill.filter(selectedSkill => selectedSkill !== deletedSkill);
        return updatedSelectedItem;
    });
  };

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleChange}/>
      </div>
      <div>
        {
          selectedSkill.map((skill, index) => {
            return (
              <div key={index}>
                <span>{skill}</span>
                <button onClick={() => {handleDelete(skill)}}>
                  <FontAwesomeIcon icon={faDeleteLeft} />
                </button>
              </div>
            );
          })
        }
      </div>
      <div>
        {showList && (
          <ul>
            <li onClick={() => {handleSelect(inputValue)}}>{inputValue}</li>
            {
              suggestions.map((suggestion, index) => {
                return <li key={index} onClick={() => handleSelect(suggestion)}>{suggestion}</li>
              })
            }
          </ul>
        )
        }
      </div>
    </div>
  )
}
