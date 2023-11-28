#include <string>
#include <iostream>

class System
{
	private:
		std::string cpu;
		std::string gpu;
		std::string lan;
		std::string wan;
		std::string storage;

    void setCpu ()
    {
		this->cpu = system("grep -m 1 'model name' /proc/cpuinfo");
    }

	void setGpu ()
	{
		this->cpu = system("");
	}

	std::string getCpu ()
	{
		return this->cpu;
	}

	std::string getGpu ()
	{
		return this->gpu;
	}

	std::string getLan ()
	{
		return this->lan;
	}

	std::string getWan ()
	{
		return this->wan;
	}

	std::string getStorage ()
	{
		return this->storage;
	}
};