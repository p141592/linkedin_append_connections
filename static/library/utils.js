String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length === 0) return hash;
    let char;
    for (var i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
	return hash;
};
