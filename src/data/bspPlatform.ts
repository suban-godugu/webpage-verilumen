export type EngineGroup = 'serial' | 'industrial' | 'display'
export type EngineStatus = 'ready' | 'testing' | 'validated' | 'warning' | 'fault'
export type EventLevel = 'pass' | 'warn' | 'error' | 'info'
export type EventChannel = 'uart' | 'can' | 'i2c' | 'ai' | 'system'

export type EngineParam = {
  id: string
  label: string
  options: string[]
}

export type EngineDef = {
  id: string
  name: string
  group: EngineGroup
  tooltip: string
  method: string
  checks: string[]
  params: EngineParam[]
  passes: number
  fails: number
}

export const demoTarget = {
  chip: 'MCU',
  bus: 'SWD Hardware Debug Port',
  ready: 'Ready — 12 interfaces available',
}

export const metrics = [
  {
    value: '60–80%',
    label: 'Validation time reduction',
    detail: 'Weeks to minutes',
  },
  {
    value: '12',
    label: 'Peripheral AI engines',
    detail: 'UART, CAN-FD, Ethernet, PCIe',
  },
  {
    value: '92%',
    label: 'Silicon register coverage',
    detail: 'Autonomous fault analysis',
  },
]

export const workflow = [
  {
    id: 'discover',
    title: 'Universal auto-discovery',
    action: 'Plug the board in',
    body: 'Connect any MCU or SoC — STM32, ESP32, NXP, and others. The platform reads on-chip debug registers and USB descriptors to identify the exact silicon family, core frequency, and flash memory.',
  },
  {
    id: 'synthesize',
    title: 'Autonomous test firmware synthesis',
    action: 'Firmware is built for the pins found',
    body: 'Dedicated validation firmware is compiled for the discovered peripheral pins, so the suite matches this board instead of a generic checklist.',
  },
  {
    id: 'execute',
    title: 'Multi-engine real-time execution',
    action: 'Twelve engines run together',
    body: 'Physical loopback and protocol stress tests run at the same time across all 12 peripheral buses — serial, industrial, and high-speed display links.',
  },
  {
    id: 'diagnose',
    title: 'AI root-cause diagnostic report',
    action: 'Faults explained in plain language',
    body: 'On-device intelligence decodes bus errors, framing faults, and missed acknowledgements, citing the register offset and the matching datasheet note.',
  },
]

export const engineGroups: { id: EngineGroup; title: string }[] = [
  { id: 'serial', title: 'Core serial and control' },
  { id: 'industrial', title: 'Industrial and automotive' },
  { id: 'display', title: 'High-speed and display' },
]

export const engines: EngineDef[] = [
  {
    id: 'uart',
    name: 'UART',
    group: 'serial',
    tooltip: 'UART is the serial link used to talk to debug consoles, sensors, and modems. This engine checks that every byte arrives intact.',
    method: 'The engine locks baud rate, injects framing errors, and checks parity so a noisy line is caught before it ships.',
    checks: ['Baud lock', 'Framing-error injection', 'Parity verification'],
    params: [
      { id: 'baud', label: 'Baud rate', options: ['9600', '115200', '921600'] },
      { id: 'parity', label: 'Parity', options: ['None', 'Even', 'Odd'] },
    ],
    passes: 24,
    fails: 0,
  },
  {
    id: 'spi',
    name: 'SPI',
    group: 'serial',
    tooltip: 'SPI is a fast full-duplex link used by flash, sensors, and displays. This engine proves clock and data stay aligned.',
    method: 'Full-duplex transfers run through direct memory access while clock phase and polarity are swept.',
    checks: ['Full-duplex transfer', 'Clock phase and polarity', 'DMA completion'],
    params: [
      { id: 'mode', label: 'SPI mode', options: ['Mode 0', 'Mode 1', 'Mode 3'] },
      { id: 'clock', label: 'Clock', options: ['1 MHz', '8 MHz', '20 MHz'] },
    ],
    passes: 18,
    fails: 0,
  },
  {
    id: 'i2c',
    name: 'I2C',
    group: 'serial',
    tooltip: 'I2C is the two-wire bus used by sensors and power monitors. This engine watches for a device that holds the clock and freezes the bus.',
    method: 'Addressing, clock stretching, and missed-acknowledgement recovery are exercised on the live bus.',
    checks: ['Clock stretching', '7-bit and 10-bit addressing', 'NACK recovery'],
    params: [
      { id: 'addr', label: 'Addressing', options: ['7-bit', '10-bit'] },
      { id: 'speed', label: 'Bus speed', options: ['100 kHz', '400 kHz'] },
    ],
    passes: 16,
    fails: 1,
  },
  {
    id: 'gpio',
    name: 'GPIO',
    group: 'serial',
    tooltip: 'GPIO is every general-purpose pin. This engine confirms pin function, pull resistors, and interrupt response time.',
    method: 'Each discovered pin is driven, measured for leakage, and timed from interrupt to handler.',
    checks: ['Pin function', 'Pull-up and pull-down leakage', 'Interrupt latency'],
    params: [
      { id: 'pull', label: 'Pull', options: ['Pull-up', 'Pull-down', 'None'] },
      { id: 'edge', label: 'Interrupt edge', options: ['Rising', 'Falling', 'Both'] },
    ],
    passes: 32,
    fails: 0,
  },
  {
    id: 'can',
    name: 'CAN-FD',
    group: 'industrial',
    tooltip: 'CAN-FD is the automotive communication bus used in modern vehicles for electronic control with very low delay.',
    method: 'The engine forces arbitration loss and tracks how fast the controller leaves the bus-off state.',
    checks: ['Arbitration loss', 'Bus-off recovery', 'Frame integrity'],
    params: [
      { id: 'rate', label: 'Data rate', options: ['2 Mbps', '5 Mbps', '8 Mbps'] },
      { id: 'id', label: 'Frame type', options: ['Standard ID', 'Extended ID'] },
    ],
    passes: 14,
    fails: 0,
  },
  {
    id: 'ethernet',
    name: 'Ethernet',
    group: 'industrial',
    tooltip: 'Ethernet carries board-to-network traffic. This engine checks the physical link, packet integrity, and receive buffers.',
    method: 'The PHY is negotiated, packets with bad checks are injected, and the ring buffer is watched for drops.',
    checks: ['Link negotiation', 'Packet integrity', 'Ring buffer health'],
    params: [
      { id: 'speed', label: 'Link speed', options: ['100 Mbps', '1 Gbps'] },
      { id: 'duplex', label: 'Duplex', options: ['Full', 'Half'] },
    ],
    passes: 20,
    fails: 0,
  },
  {
    id: 'usb',
    name: 'USB',
    group: 'industrial',
    tooltip: 'USB is how the board presents itself to a host. This engine checks enumeration, descriptors, and stall recovery.',
    method: 'The device enumerates as a serial or input device, descriptors are parsed, and a stall is cleared.',
    checks: ['Device enumeration', 'Descriptor parsing', 'Stall handling'],
    params: [
      { id: 'class', label: 'Device class', options: ['Serial', 'Input device'] },
      { id: 'speed', label: 'Speed', options: ['Full speed', 'High speed'] },
    ],
    passes: 11,
    fails: 0,
  },
  {
    id: 'pcie',
    name: 'PCIe',
    group: 'display',
    tooltip: 'PCIe is the high-speed link used by expansion devices. This engine confirms the link trains and stays within the expected generation.',
    method: 'Link training is observed through bring-up, then generation compliance and error reporting are checked.',
    checks: ['Link training', 'Generation compliance', 'Error reporting'],
    params: [
      { id: 'gen', label: 'Generation', options: ['Gen2', 'Gen3'] },
      { id: 'width', label: 'Link width', options: ['x1', 'x4'] },
    ],
    passes: 9,
    fails: 0,
  },
  {
    id: 'emmc',
    name: 'eMMC',
    group: 'display',
    tooltip: 'eMMC is on-board storage. This engine measures throughput, bus width, and wear-level behavior.',
    method: 'The bus negotiates 4-bit and 8-bit modes and a sustained transfer is timed.',
    checks: ['Bus width negotiation', 'Sustained throughput', 'Wear-level status'],
    params: [
      { id: 'width', label: 'Bus width', options: ['4-bit', '8-bit'] },
      { id: 'mode', label: 'Transfer', options: ['Read', 'Write'] },
    ],
    passes: 12,
    fails: 0,
  },
  {
    id: 'hdmi',
    name: 'HDMI',
    group: 'display',
    tooltip: 'HDMI drives an external display. This engine checks the pixel clock and that frames leave on time.',
    method: 'The pixel-clock lock is measured and a frame is checked for timing closure.',
    checks: ['Pixel-clock lock', 'Frame timing', 'Link idle'],
    params: [
      { id: 'format', label: 'Format', options: ['1080p60', '720p60'] },
    ],
    passes: 8,
    fails: 0,
  },
  {
    id: 'edp',
    name: 'eDP',
    group: 'display',
    tooltip: 'eDP is the embedded display link inside a product. This engine confirms lane training and panel wake.',
    method: 'Display lanes are trained and the panel is woken on the expected timing.',
    checks: ['Lane training', 'Panel wake', 'Link status'],
    params: [
      { id: 'lanes', label: 'Lanes', options: ['2 lanes', '4 lanes'] },
    ],
    passes: 7,
    fails: 0,
  },
  {
    id: 'tft',
    name: 'TFT',
    group: 'display',
    tooltip: 'TFT is a direct panel interface. This engine checks framebuffer timing against the panel’s refresh.',
    method: 'Horizontal and vertical timing are compared with the panel specification and a test frame is pushed.',
    checks: ['Pixel clock', 'Framebuffer timing', 'Refresh match'],
    params: [
      { id: 'refresh', label: 'Refresh', options: ['60 Hz', '50 Hz'] },
    ],
    passes: 6,
    fails: 0,
  },
]

export const comparison = [
  {
    criteria: 'Test setup time',
    traditional: '2 to 3 days per board',
    platform: 'Instant — under 3 seconds with auto-detect',
  },
  {
    criteria: 'Validation cycle',
    traditional: '2 to 4 weeks of manual lab work',
    platform: 'Under 2 minutes, fully autonomous',
  },
  {
    criteria: 'Failure analysis',
    traditional: 'Manual analyzer capture and datasheet reading',
    platform: 'Immediate register-level root cause, in plain language',
  },
  {
    criteria: 'Coverage',
    traditional: 'Spot tests on 2–3 main interfaces',
    platform: 'All 12 peripherals, tested together',
  },
  {
    criteria: 'Engineering time',
    traditional: 'Continuous senior firmware engineer time',
    platform: 'One click, then the suite runs itself',
  },
]

export const diagnosis = {
  title: 'I2C bus lockup — clock stretching timeout at address 0x48',
  evidence:
    'The peripheral held the clock low for more than 25 ms during the acknowledge phase. The bus-error flag was asserted in the status register at offset 0x14.',
  recommendation:
    'Turn on the automatic bus timeout, and fit 4.7 kΩ pull-up resistors on both bus lines.',
  confidence: '98.4% match to the published silicon note',
}

export function engineById(id: string) {
  return engines.find((engine) => engine.id === id)
}

export const engineFace: Record<
  string,
  { latency: string; specLabel: string; specValue: string; results: string[]; insight: string }
> = {
  uart: { latency: '1.8 ms', specLabel: 'Baud', specValue: '115200', results: ['Frame integrity', 'Baud synchronization', 'Parity verification', 'DMA transfer'], insight: 'No abnormal behavior detected.' },
  spi: { latency: '0.9 ms', specLabel: 'Clock', specValue: '8 MHz', results: ['Full-duplex transfer', 'Clock phase', 'Polarity', 'DMA completion'], insight: 'No abnormal behavior detected.' },
  i2c: { latency: '25 ms', specLabel: 'Address', specValue: '0x48', results: ['Clock stretching', 'Address acknowledge', 'Bus recovery', 'Timeout watch'], insight: 'Clock stretching timeout during the acknowledge phase.' },
  gpio: { latency: '0.4 ms', specLabel: 'Edge', specValue: 'Rising', results: ['Pin function', 'Pull leakage', 'Interrupt latency', 'Drive strength'], insight: 'No abnormal behavior detected.' },
  can: { latency: '2.4 ms', specLabel: 'Bitrate', specValue: '2 Mbps', results: ['Arbitration', 'Frame integrity', 'CRC check', 'Bus-off recovery'], insight: 'CRC timing sits outside the expected window.' },
  ethernet: { latency: '3.1 ms', specLabel: 'Link', specValue: '1 Gbps', results: ['Link negotiation', 'Packet integrity', 'Ring buffer', 'CRC drops'], insight: 'No abnormal behavior detected.' },
  usb: { latency: '4.6 ms', specLabel: 'Class', specValue: 'Serial', results: ['Enumeration', 'Descriptor parse', 'Stall recovery', 'Transfer complete'], insight: 'No abnormal behavior detected.' },
  pcie: { latency: '6.2 ms', specLabel: 'Link', specValue: 'Gen3 x1', results: ['Link training', 'Generation compliance', 'Error reporting', 'Lane status'], insight: 'No abnormal behavior detected.' },
  emmc: { latency: '5.5 ms', specLabel: 'Width', specValue: '8-bit', results: ['Bus negotiation', 'Read throughput', 'Write throughput', 'Wear status'], insight: 'No abnormal behavior detected.' },
  hdmi: { latency: '1.2 ms', specLabel: 'Format', specValue: '1080p60', results: ['Pixel-clock lock', 'Frame timing', 'Link idle', 'Blanking'], insight: 'No abnormal behavior detected.' },
  edp: { latency: '1.6 ms', specLabel: 'Lanes', specValue: '4 lanes', results: ['Lane training', 'Panel wake', 'Link status', 'Timing'], insight: 'No abnormal behavior detected.' },
  tft: { latency: '1.1 ms', specLabel: 'Refresh', specValue: '60 Hz', results: ['Pixel clock', 'Framebuffer timing', 'Refresh match', 'Porch timing'], insight: 'No abnormal behavior detected.' },
}

export const signalViews = [
  { id: 'uart', label: 'UART', freq: '115.2 kHz', voltage: '3.3 V', timing: '8.7 µs', rate: '11.5 kB/s', errors: '0' },
  { id: 'spi', label: 'SPI', freq: '8 MHz', voltage: '3.3 V', timing: '125 ns', rate: '8 MB/s', errors: '0' },
  { id: 'i2c', label: 'I2C', freq: '400 kHz', voltage: '3.3 V', timing: '2.5 µs', rate: '40 kB/s', errors: '1' },
  { id: 'can', label: 'CAN-FD', freq: '2 Mbps', voltage: '5 V', timing: '500 ns', rate: '1,284/s', errors: '1' },
  { id: 'ethernet', label: 'Ethernet', freq: '125 MHz', voltage: '3.3 V', timing: '8 ns', rate: '940 Mb/s', errors: '0' },
] as const

export const i2cRegister = {
  name: 'I2C_SR1',
  address: '0x40005414',
  bits: [
    { bit: 15, name: 'Reserved', value: 0, fault: false },
    { bit: 8, name: 'BERR', value: 1, fault: true },
    { bit: 7, name: 'ARLO', value: 0, fault: false },
    { bit: 6, name: 'AF', value: 0, fault: false },
    { bit: 5, name: 'OVR', value: 0, fault: false },
  ],
}

export const failureTimeline = [
  { time: '10:42:01.120', label: 'Signal anomaly detected' },
  { time: '10:42:01.122', label: 'Peripheral error detected' },
  { time: '10:42:01.124', label: 'Register flag identified' },
  { time: '10:42:01.130', label: 'Silicon evidence correlated' },
  { time: '10:42:01.142', label: 'AI root cause generated' },
]

export const valueRows = [
  { title: 'Setup', traditional: '2–3 days', platform: '< 3 sec' },
  { title: 'Validation', traditional: '2–4 weeks', platform: '< 2 min' },
  { title: 'Failure analysis', traditional: 'Manual analyzer + datasheet', platform: 'AI register-level diagnosis' },
  { title: 'Coverage', traditional: '2–3 interfaces', platform: '12 concurrent engines' },
  { title: 'Engineering time', traditional: 'Continuous manual effort', platform: 'Single-click automation' },
]
