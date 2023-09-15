import colors from '../styles/colors'

export default function calculateIMC ({ weight, height }) {
  const imc = weight / (height * height)
  const message = {}
  
  message.imc = imc.toFixed(2)

  return message
}
