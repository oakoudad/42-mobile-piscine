import { Text, View, TouchableOpacity } from 'react-native';
import { buttonsGroups, operators } from '../utils/utils';
import { ButtonsProps } from '../utils/types';

export default function Buttons({orientation}: ButtonsProps) {
  return (
    <View className={`
        ${orientation !== 'PORTRAIT' ? 'gap-2 mb-2' : 'gap-4 mb-4'}
        gap-4 
    `}>
      {
        buttonsGroups.map((group, index) => (
          <View key={index} className='flex flex-row'>
            {
              group.map((button, j) => (
                <View key={'btn_' + index + '_' + j} className='flex-1 justify-center items-center relative'>
                    {
                        !button.is_copy ?
                        <TouchableOpacity
                          className={`
                              ${orientation !== 'PORTRAIT' ? 'h-[40] w-[90%]' : 'size-[70]'}
                              ${button?.backgroundColor && '!bg-[#FF8D41]'}
                            bg-[#F5F5F5] justify-center items-center rounded-full
                          `}
                          activeOpacity={.7}
                          onPress={() => console.log(`button pressed :${button.text}`)}
                        >
                            <Text
                                className={`
                                    text-xl font-semibold
                                    ${button?.backgroundColor && '!text-white'}
                                    ${(operators.includes(button.text) || button.text == '.' || button.text == '=') && '!text-3xl !font-medium'}
                                `}
                            >
                                {button.text}
                            </Text>
                        </TouchableOpacity>
                        : <TouchableOpacity
                            className={`
                                ${orientation !== 'PORTRAIT' ? 'h-[40] w-[90%]' : 'size-[70]'}
                                ${button?.backgroundColor && '!bg-[#FF8D41]'}
                              bg-[#F5F5F5] justify-center items-center rounded-full
                            `}
                            activeOpacity={.7}
                            onPress={() => console.log(`button pressed: Copy`)}
                          >
                            <Text>Copy</Text>
                          </TouchableOpacity>
                    }
                </View>
              ))
            }
          </View>
        ))
      }
    </View>
  );
};