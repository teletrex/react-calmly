/* <LICENSE>
*
* Copyright (C) 2022 Louis F. Roehrs, All rights reserved.
*
* </LICENSE>
*  */



import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import settings  from '../../settings';
import classNames from 'classnames';
import { Checkmark, Close } from '@carbon/icons-react';
import compact from 'lodash/compact';
import noop from 'lodash/noop';

import { useTranslation } from '../../translation';
import {
  TextInput,
  Button,
  Link,
  Tag
} from '@carbon/react';
import SearchDropDown from '../search-drop-down/SearchDropDown';
import SearchGroup from '../search-drop-down/search-drop-down-elements/SearchGroup';
import SearchHeader from '../search-drop-down/search-drop-down-elements/SearchHeader';
import SearchElement from '../search-drop-down/search-drop-down-elements/SearchElement';
import SearchElementContent from '../search-drop-down/search-drop-down-elements/SearchElementContent';
import { ReactComponentPropType } from '../utils/prop-types';


const { prefix } = settings;

const buildClass = (suffix = '') => `${prefix}--add-tags${suffix}`;
const getNewTags = (input, allowTagSplitting, delimiter = ',') => {
  const newTags = allowTagSplitting ? input.split(delimiter) : [input];
  return compact(newTags.map(el => el.trim()));
};

const AddTags = ({
  allowTagSplitting,
  hideInputs,
  ariaLabelTagInput,
  disabledAddTags,
  onInputChange,
  onAddTag,
  onCancel,
  onDelete,
  inline,
  inlineInputAlwaysOn,
  placeholder,
  suggestions,
  tags,
  size,
  shapeForm,
  inputComponent: InputComponent,
  inputValue,
  tagExistsError,
  validateInputValue,
  ...restProps
}) => {
  const { t } = useTranslation();
  const [input, setInput] = useState(inputValue);
  const [isDropDownOpen, setDropDownVisibility] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [isInputVisible, setInputVisibility] = useState(false);
  const inputRef = useRef(null);

  const defaultAriaLabel = allowTagSplitting ? t('Use commas for multiple tags') : t('Tag input');
  const defaultPlaceholder = allowTagSplitting ? t('Use commas for multiple tags') : t('Enter tag');

  const handleValidation = value => {
    const newTags = getNewTags(value);
    const foundTag = newTags.find(el => tags.indexOf(el) !== -1);
    setInvalid(!!foundTag);
  };

  useEffect(() => {
    if (validateInputValue) {
      setInput(inputValue);
      handleValidation(inputValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, validateInputValue]);

  useEffect(() => {
    if (isInputVisible) {
      inputRef.current.focus();
    }
  }, [isInputVisible]);

  const prepareToAdd = useCallback(
    input => {
      const newTags = getNewTags(input, allowTagSplitting);
      setInput('');
      if (inline) {
        setInputVisibility(false);
      }
      return [...new Set([...tags, ...newTags])];
    },
    [setInput, inline, tags, allowTagSplitting]
  );

  const handleAddTag = useCallback(() => {
    onAddTag(prepareToAdd(input));
  }, [onAddTag, input, prepareToAdd]);

  const prepareToDelete = (tags, tag) => tags.filter(el => el !== tag);

  const handleInputChange = value => {
    setInput(value);
    onInputChange(value);
    setDropDownVisibility(true);
    handleValidation(value);
  };

  const hideInput = () => {
    onCancel('');
    setInput('');
    setInvalid(false);
    setInputVisibility(false);
  };

  const handleInputBlur = () => {
    setDropDownVisibility(false);
  };

  const handleSuggestions = suggestion => {
    setInput(suggestion);
    handleValidation(suggestion);
    onAddTag(prepareToAdd(suggestion));
  };

  const renderInput = () => (
    <div
      className={classNames(buildClass('--container'), {
        [buildClass('--invalid')]: invalid,
      })}
    >
      <div className={buildClass('--input-container')}>
        <InputComponent
          ref={inputRef}
          aria-label={ariaLabelTagInput || defaultAriaLabel}
          className={buildClass('--input')}
          hideLabel={inline}
          invalid={invalid}
          invalidText={tagExistsError || t('This tag already exists')}
          labelText={t('Tags')}
          onBlur={() => handleInputBlur()}
          onChange={e => handleInputChange(e.target.value)}
          placeholder={placeholder || defaultPlaceholder}
          type="text"
          value={input}
          size={size}
          {...restProps}
        />
        {isDropDownOpen && suggestions && suggestions.length > 0 && (
          <div className = {buildClass('--list')}>
          <div className={`${prefix}--search-drop-down`}>
            <SearchGroup>
              <SearchHeader>Suggestions</SearchHeader>
              {suggestions.map(suggestion => (
                <SearchElement key={suggestion} onMouseDown={() => handleSuggestions(suggestion)}>
                  <SearchElementContent>{suggestion}</SearchElementContent>
                </SearchElement>
              ))}
            </SearchGroup>
          </div>
          </div>
        )}
      </div>
      {!inline && (
        <Button
          className={classNames(buildClass('--submit'), buildClass('--single'))}
          disabled={disabledAddTags || invalid || input === ''}
          kind="tertiary"
          onClick={handleAddTag}
          size={size}
        >
          {t('Add')}
        </Button>
      )}
      {inline  && (
        <>
          <Button
            className={buildClass('--submit')}
            disabled={disabledAddTags || invalid || input === ''}
            hasIconOnly
            iconDescription={t('Add')}
            kind="ghost"
            onClick={handleAddTag}
            renderIcon={()=><Checkmark size={20} />}
            size={size}
            tooltipAlignment="center"
            tooltipPosition="bottom"
          >Submit</Button>
          <Button
            className={buildClass('--cancel')}
            hasIconOnly
            iconDescription={t('Cancel')}
            kind="ghost"
            onClick={() => hideInput()}
            renderIcon={()=><Close size={20} />}
            size={size}
            tooltipAlignment="center"
            tooltipPosition="bottom"
          >Cancel</Button>
        </>
      )}
    </div>
  );

  return (
    <div
      className={classNames(buildClass(), {
        [buildClass('--inline')]: inline,
        [buildClass('--inline-input-always-on')]: inlineInputAlwaysOn,
      })}
    >
      {(!inline || isInputVisible) && !hideInputs && renderInput()}
      {(!isInputVisible || inline) &&
        tags &&
        tags.map((tag, i) => (
          <Tag
            key={tag}
            className={buildClass('--filter-tag')}
            filter
            id={`tag-${tag}`}
            onClick={() => onDelete(prepareToDelete(tags, tag), tag, i)}
            shapeForm={shapeForm}
            type="rc-gray"
          >
            {tag}
          </Tag>
        ))}

      {!hideInputs && inline && inlineInputAlwaysOn && renderInput()}
      {!hideInputs && inline && !inlineInputAlwaysOn && !isInputVisible && (
        /* eslint-disable */
        <Link
          className={buildClass('--show-input-button')}
          href="#"
          target="_self"
          onClick={e => {
            e.preventDefault();
            setInputVisibility(true);
          }}
        >
          {t('+ Add tag')}
        </Link>
        /* eslint-enable */
      )}
    </div>
  );
};

AddTags.propTypes = {
  allowTagSplitting: PropTypes.bool,
  ariaLabelTagInput: PropTypes.string,
  disabledAddTags: PropTypes.bool,
  hideInputs: PropTypes.bool,
  inline: PropTypes.bool,
  inlineInputAlwaysOn: PropTypes.bool,
  inputComponent: ReactComponentPropType,
  inputValue: PropTypes.string,
  onAddTag: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  shapeForm: PropTypes.string,
  /* eslint-disable-next-line react/require-default-props */
  suggestions: PropTypes.arrayOf(PropTypes.string),
  tagExistsError: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  validateInputValue: PropTypes.bool,
};

AddTags.defaultProps = {
  allowTagSplitting: true,
  ariaLabelTagInput: '',
  disabledAddTags: false,
  hideInputs: false,
  inline: false,
  inlineInputAlwaysOn: false,
  inputComponent: TextInput,
  inputValue: '',
  onCancel: noop,
  onInputChange: noop,
  placeholder: '',
  shapeForm: 'oval',
  tagExistsError: '',
  validateInputValue: false,
};

export default AddTags;
