import React from 'react'

import {Actions, Button, Card, SliderControl} from './styles'
import {Feather} from '@expo/vector-icons'
import {rem} from '@/utils/rem'
import FieldSubscriber from "@/components/Forms/FieldSubscriber";

function ControlCard({minimumValue, maximumValue, title, step, decimalPlaces = 2, ...props}) {
    return (
        <FieldSubscriber {...props}>
            {({field: {value, onChange}}) => (
                <Card>
                    <Card.Title>{title}</Card.Title>
                    <Card.Value>{(value ?? 0).toFixed(decimalPlaces)}</Card.Value>

                    <Actions>
                        <Button onPress={() => {
                            const val = value - (step ?? 0)
                            if (val < minimumValue) return
                            onChange(val)
                        }}>
                            <Feather name="minus-circle" size={rem(1)} color="black"/>
                        </Button>

                        <SliderControl
                            minimumValue={minimumValue}
                            step={step}
                            value={value}
                            maximumValue={maximumValue}
                            onValueChange={onChange}
                        />

                        <Button onPress={() => {
                            const val = value + (step ?? 0)
                            if (val > maximumValue) return
                            onChange(val)
                        }}>
                            <Feather name="plus-circle" size={rem(1)} color="black"/>
                        </Button>
                    </Actions>
                </Card>
            )}
        </FieldSubscriber>
    )
}

export default ControlCard
