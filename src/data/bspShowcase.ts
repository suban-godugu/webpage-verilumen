export const heroSupport =
  'AI-driven validation for MCUs, SoCs, development boards, and embedded platforms — from silicon discovery to BSP intelligence.'

export const platformTags = [
  'MCU',
  'SoC',
  'Custom Board',
  'Evaluation Board',
  'Reference Design',
  'Embedded Platform',
]

export const architectures = ['ARM Cortex', 'RISC-V', 'x86 / Embedded', 'Custom SoC', 'FPGA-based systems']

export const hardwareTiles = [
  {
    type: 'MCU' as const,
    title: 'MCU',
    lede: 'Microcontrollers',
    points: ['Peripheral validation', 'Clock / reset', 'Memory', 'GPIO', 'Communication interfaces', 'BSP validation'],
  },
  {
    type: 'SOC' as const,
    title: 'SoC',
    lede: 'Application processors',
    points: ['Boot chain', 'Peripheral integration', 'Drivers', 'Memory subsystem', 'Power domains'],
  },
  {
    type: 'BOARD' as const,
    title: 'Custom boards',
    lede: 'Boards and references',
    points: ['Custom silicon', 'Custom PCB', 'Reference designs', 'Production boards', 'Engineering prototypes'],
  },
]

export const stackLayers = [
  { code: '01', title: 'Silicon', items: ['MCU', 'SoC', 'Custom silicon'] },
  { code: '02', title: 'Hardware', items: ['Development board', 'Reference board', 'Carrier board', 'Production hardware'] },
  { code: '03', title: 'BSP', items: ['Bootloader', 'BSP', 'Drivers', 'Device tree', 'Firmware'] },
  { code: '04', title: 'Peripherals', items: ['UART', 'SPI', 'I2C', 'GPIO', 'CAN', 'Ethernet', 'USB', 'PCIe', 'Storage', 'Display'] },
  { code: '05', title: 'Intelligence', items: ['Validation', 'Correlation', 'Diagnosis', 'Recommendations', 'Engineering reports'] },
]

export const workflow = [
  {
    code: '01',
    title: 'Discover',
    body: 'Automatically identify the hardware platform, silicon architecture, memory, interfaces, and available capabilities.',
  },
  {
    code: '02',
    title: 'Understand',
    body: 'Map silicon, BSP, drivers, peripherals, firmware, and hardware configuration into a unified validation model.',
  },
  {
    code: '03',
    title: 'Validate',
    body: "Apply intelligent validation workflows across the platform's supported interfaces and subsystems.",
    coverage: ['Connectivity', 'Firmware', 'Drivers', 'Peripheral', 'Timing', 'Memory', 'Power', 'System integration'],
  },
  {
    code: '04',
    title: 'Diagnose',
    body: 'Correlate failures with hardware, firmware, registers, drivers, configuration, and known engineering evidence.',
    chain: ['Failure', 'Evidence', 'Correlation', 'Root cause', 'Engineering recommendation'],
  },
]

export const understandLayers = ['Silicon', 'BSP', 'Driver', 'Peripheral', 'Board']

export const formFactors = [
  {
    type: 'BOARD' as const,
    title: 'Board',
    body: 'Validate board-level integration across interfaces, peripherals, firmware, and system configuration.',
  },
  {
    type: 'SOC' as const,
    title: 'SoC',
    body: 'Correlate silicon behavior, firmware, drivers, and platform-level validation.',
  },
]

export const bspStack = ['Application', 'Middleware', 'Drivers', 'BSP', 'Bootloader', 'Silicon']

export const bspLinks = ['Boot', 'Clock', 'Memory', 'GPIO', 'Interrupts', 'Peripheral drivers', 'Device tree', 'Power', 'Connectivity']

export const coverageDomains = [
  { name: 'Compute', note: 'Processor and core behavior inside the validation model.' },
  { name: 'Memory', note: 'Memory subsystem evidence across the platform.' },
  { name: 'GPIO', note: 'Pin configuration and interface state.' },
  { name: 'UART', note: 'Serial communication interface validation.' },
  { name: 'SPI', note: 'Synchronous serial interface validation.' },
  { name: 'I2C', note: 'Bus configuration and device communication.' },
  { name: 'CAN / CAN-FD', note: 'Automotive communication interface validation.' },
  { name: 'Ethernet', note: 'Network link and path evidence.' },
  { name: 'USB', note: 'Host and device interface validation.' },
  { name: 'PCIe', note: 'High-speed link validation.' },
  { name: 'Storage', note: 'Persistent storage and mount behavior.' },
  { name: 'Display', note: 'Panel path and timing evidence.' },
  { name: 'Power', note: 'Power domains and operating states.' },
  { name: 'Clock', note: 'Clock tree and reset configuration.' },
  { name: 'Boot', note: 'Boot chain from reset to handoff.' },
  { name: 'Drivers', note: 'Driver load, response, and recovery.' },
  { name: 'BSP', note: 'Software layer connecting silicon capabilities with the operating environment and drivers.' },
  { name: 'System integration', note: 'Cross-layer platform behavior.' },
]

export const aiPipeline = ['Signal', 'Event', 'Register', 'Driver', 'BSP', 'Silicon', 'AI correlation', 'Root cause']

export const diagnostic = {
  title: 'System diagnostic',
  rows: [
    ['Subsystem', 'I2C'],
    ['Observed condition', 'Communication timeout'],
    ['Evidence', 'Protocol + firmware + register correlation'],
    ['Potential cause', 'Bus configuration mismatch'],
    ['Engineering action', 'Review timing and pull-up configuration'],
  ],
}

export const workspace = [
  {
    title: 'Validation coverage',
    rows: ['Platform', 'Subsystem', 'Peripheral', 'BSP', 'Driver', 'Status', 'Coverage'],
  },
  {
    title: 'Diagnostic intelligence',
    rows: ['Issue', 'Evidence', 'Affected subsystem', 'Potential cause', 'Recommended action'],
  },
  {
    title: 'Engineering report',
    rows: ['Validation summary', 'Coverage', 'Findings', 'Root causes', 'Recommendations', 'Traceability'],
  },
]

export const generations = ['Prototype', 'Engineering board', 'Reference platform', 'Production board', 'Next generation silicon']

export const values = [
  {
    title: 'Reduce repetitive validation work',
    body: 'Automate repeatable validation workflows so engineers can focus on deeper hardware and firmware problems.',
  },
  {
    title: 'Improve validation visibility',
    body: 'Bring silicon, BSP, drivers, peripherals, and system-level evidence into one engineering view.',
  },
  {
    title: 'Accelerate root-cause investigation',
    body: 'Correlate multiple evidence sources instead of forcing engineers to manually inspect isolated logs.',
  },
  {
    title: 'Standardize validation',
    body: 'Create repeatable validation workflows across boards, platforms, and product generations.',
  },
  {
    title: 'Preserve engineering knowledge',
    body: 'Turn validation evidence and diagnostic knowledge into reusable engineering intelligence.',
  },
]

export const teams = [
  { title: 'Hardware engineering', body: 'Board-level validation and interface evidence.' },
  { title: 'Firmware engineering', body: 'Driver and BSP validation visibility.' },
  { title: 'BSP teams', body: 'Boot, device tree, and board-support evidence in one view.' },
  { title: 'Silicon engineering', body: 'Register-level evidence and failure correlation.' },
  { title: 'Validation teams', body: 'Repeatable coverage across platforms and generations.' },
  { title: 'System engineering', body: 'Cross-layer platform diagnostics.' },
  { title: 'R&D', body: 'A shared model from prototype silicon to production hardware.' },
]

export const evidenceSources = ['Silicon', 'BSP', 'Drivers']
