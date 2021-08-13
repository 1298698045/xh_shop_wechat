const message = {
	toast:(toastOption={}) => {
		let duration, icon, success, fail, delta, deltaTime;
		delta = toastOption.delta || 0;
		icon = toastOption.icon || 'none';
		duration = toastOption.duration || 2000;
		deltaTime = toastOption.deltaTime || 2;
		success = toastOption.success;
		const navigateBack = () => {
			if(delta && delta > 0){
				setTimeout(()=>{
					uni.navigateBack({
						delta:delta
					})
				},deltaTime*1000)
			}
		}
		uni.showToast({
			...toastOption,
			success:()=>{
				success && success();
				navigateBack();
			},
            fail: () => {
                fail && fail();
                navigateBack()
            }
		})
	}
}
export default message;