import {FormControl, Text, View, WarningOutlineIcon} from "native-base";
import React from "react";
import {useController, useFormContext} from "react-hook-form";

const FieldSubscriber = React.forwardRef(
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
            rules,
            _form_control,
            forceContext,
        },
        ref
    ) => {
        const {control} = useFormContext() ?? forceContext;
        const fieldValues = useController({
            name,
            rules: {
                required: isRequired
                    ? {
                        value: true,
                        message: 'Este campo es requerido',
                    }
                    : false,
                ...rules,
            },
            control,
        });

        const {fieldState} = fieldValues;
        return (
            <View ref={ref} {..._view}>
                <FormControl isInvalid={!!fieldState?.error} {..._form_control}>
                    {label ? (
                        <FormControl.Label>
                            <Text {..._textLabel}>
                                {label} {isRequired ? <Text color="red.700">*</Text> : null}{" "}
                            </Text>
                        </FormControl.Label>
                    ) : null}

                    {children(fieldValues)}

                    {fieldState.error?.message ? (
                        <FormControl.ErrorMessage
                            leftIcon={<WarningOutlineIcon size="xs"/>}
                        >
                            {fieldState.error?.message}
                        </FormControl.ErrorMessage>
                    ) : (
                        <>
                            {helperText ? (
                                <FormControl.HelperText>{helperText}</FormControl.HelperText>
                            ) : null}
                        </>
                    )}
                </FormControl>
            </View>
        );
    }
);

FieldSubscriber.displayName = "FieldSubscriber";

export default FieldSubscriber;