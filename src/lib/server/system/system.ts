import {
	currentLoad,
	services,
	processes,
	cpuTemperature,
	mem,
	fsSize,
	osInfo,
	users,
	networkStats,
	networkInterfaces
} from 'systeminformation';

export async function sysInfo() {
	const os = await osInfo();
	const userDetails = await users();

	return {
		os,
		userDetails
	};
}

export async function procInfo() {
	const processInfo = await processes();

	return processInfo;
}

export async function diskInfo() {
	const diskSize = await fsSize();
	return diskSize;
}

export async function cpuInfo() {
	const cpuLoad = await currentLoad();
	const cpuTemp = await cpuTemperature();

	return {
		cpuTemp,
		cpuLoad
	};
}

export async function memInfo() {
	const memoryInfo = await mem();

	return memoryInfo;
}

export async function serviceInfo() {
	const serviceList = await services('*');

	return serviceList;
}

export async function netInfo() {
	const netIface = await networkInterfaces();
	const netStat = await networkStats();

	return { netStat, netIface };
}
