import {Ionicons} from "@expo/vector-icons";
import {CloseIcon, Icon, IconButton, Input} from "native-base";
import React, {useState} from "react";
import FieldSubscriber from "./FieldSubscriber";

const InputIcon = ({
                       type,
                       hasClear = false,
                       onPressIconEye,
                       onPressIconClose,
                       isPasswordVisible = false,
                       isValid = false,
                       value,
                       custom,
                   }) => {
    if (type === "password") {
        return (
            <IconButton h="full"
                        variant="unstyled"
                        onPress={onPressIconEye}
                        icon={
                            isPasswordVisible ? (
                                <Icon
                                    as={Ionicons}
                                    name="eye-off-outline"
                                    size="sm"
                                    color="gray.600"
                                />
                            ) : (
                                <Icon as={Ionicons} name="eye-outline" size="sm" color="gray.600"/>
                            )
                        }
            />
        );
    }

    if (hasClear && value !== "") {
        return (
            <IconButton
                variant="unstyled"
                position="absolute"
                right={1}
                h="full"
                onPress={onPressIconClose}
                icon={<CloseIcon size="3" color="coolGray.600"/>}
            />
        );
    }

    if (isValid) {
        return (
            <IconButton
                h="full"
                variant="unstyled"
                position="absolute"
                onPress={onPressIconEye}
                right={1}
                icon={
                    <Icon
                        as={Ionicons}
                        bg="green.400"
                        name="checkmark-outline"
                        size="sm"
                        color="white"
                    />
                }
            />
        );
    }

    return custom ?? null;
};

const InputField = React.forwardRef(
    (
        {
            children,
            label,
            name,
            placeholder,
            _view,
            _textLabel,
            isRequired = false,
            helperText,
            onChange,
            rules,
            hasIcon = true,
            hasClear = false,
            ...rest
        },
        ref
    ) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const toggleClickEye = () => {
            setIsPasswordVisible((state) => !state);
        };

        return (
            <FieldSubscriber
                {...{
                    name,
                    rules,
                    ref,
                    helperText,
                    placeholder,
                    isRequired,
                    label,
                    _textLabel,
                    _view,
                }}
            >
                {({field, fieldState, ...fieldValues}) => (
                    <>
                        {typeof children === "function" ? (
                            children({field, fieldState, ...fieldValues})
                        ) : (
                            <>
                                <Input
                                    py={4}
                                    autoCapitalize="none"
                                    _focus={{
                                        backgroundColor: "white",
                                        borderColor: fieldState?.error
                                            ? "primary.500"
                                            : "primary.900",
                                    }}
                                    bg="generics.gray"
                                    placeholder={placeholder}
                                    onChangeText={(e) => {
                                        if (onChange) {
                                            onChange(e);
                                        }
                                        field.onChange(e);
                                    }}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    value={field.value}
                                    {...rest}
                                    InputRightElement={
                                        hasIcon ? (
                                            <InputIcon
                                                isPasswordVisible={isPasswordVisible}
                                                value={field.value}
                                                isValid={fieldState.isDirty && !fieldState.error}
                                                onPressIconClose={() => {
                                                    field.onChange("");
                                                }}
                                                onPressIconEye={toggleClickEye}
                                                custom={rest.InputRightElement}
                                                hasClear={hasClear}
                                                type={rest.type}
                                            />
                                        ) : undefined
                                    }
                                    type={
                                        rest.type === "password"
                                            ? isPasswordVisible
                                                ? "text"
                                                : "password"
                                            : rest.type
                                    }
                                />
                            </>
                        )}
                    </>
                )}
            </FieldSubscriber>
        );
    }
);

InputField.displayName = "InputField";

export default InputField;