DEVICE := vendor/cmsis-device-c0-bcc8d94fecb767d1afb53d8c12a8f87ebeb503a2
CORE := vendor/CMSIS_5-5.9.0/CMSIS/Core/Include
CROSS := toolchain/arm-gnu-toolchain-13.3.rel1-darwin-arm64-arm-none-eabi/bin/arm-none-eabi-
CC := $(CROSS)gcc
FLAGS := -mcpu=cortex-m0plus -mthumb -std=c11 -Os -g3 -Wall -Wextra -Werror -ffunction-sections -fdata-sections -DSTM32C011xx -I$(DEVICE)/Include -I$(CORE)
SOURCES := main.c control.c $(DEVICE)/Source/Templates/system_stm32c0xx.c $(DEVICE)/Source/Templates/gcc/startup_stm32c011xx.s

.PHONY: all test clean
all: build/pa25.bin build/pa25.hex

build:
	mkdir -p build

build/pa25.elf: $(SOURCES) control.h stm32c011.ld | build
	$(CC) $(FLAGS) $(SOURCES) -Tstm32c011.ld -Wl,--gc-sections,-Map=build/pa25.map --specs=nano.specs --specs=nosys.specs -o $@
	$(CROSS)size $@

build/pa25.bin: build/pa25.elf
	$(CROSS)objcopy -O binary $< $@

build/pa25.hex: build/pa25.elf
	$(CROSS)objcopy -O ihex $< $@

test: | build
	cc -std=c11 -Wall -Wextra -Werror -fsanitize=address,undefined -g control.c test_control.c -o build/test-control
	./build/test-control

clean:
	rm -rf build
